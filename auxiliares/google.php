<?php 
require_once 'src/Google_Client.php';
require_once 'src/contrib/Google_Oauth2Service.php';

$db_username = "root"; 
$db_password = "iaw"; 
$hostname = "localhost"; 
$db_name = 'fixture-interactivo';
$google_redirect_url = "http://".$_SERVER["HTTP_HOST"].$_SERVER['PHP_SELF'];
$google_client_id = '724240553196-fj6aak6ia56ehc7uuj42vk35t61vb0a7.apps.googleusercontent.com';
$google_client_secret = 'iTyxeOiiMuedPueh1SqUvQNz';
$google_developer_key = 'AIzaSyB2VNDrCc4EZ6uausylTGt9JSyEyFW5xLU';

$gClient = new Google_Client();
$gClient->setAccessType('offline'); 
$gClient->setApplicationName('My Application name');
$gClient->setClientId($google_client_id);
$gClient->setClientSecret($google_client_secret);
$gClient->setRedirectUri($google_redirect_url);
$gClient->setDeveloperKey($google_developer_key);
//$gClient->setApprovalPrompt ("auto");

$google_oauthV2 = new Google_Oauth2Service($gClient);



if (isset($_GET['code'])) {
  $gClient->authenticate($_GET['code']);
  $_SESSION['user']['token'] = $gClient->getAccessToken();
  header('Location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']);
}

if (isset($_SESSION['user']['token'])) {
  $gClient->setAccessToken($_SESSION['user']['token']);
}

if (!$gClient->getAccessToken()) 
{
       $authUrl = $gClient->createAuthUrl();   

} else 
{

          $user = $google_oauthV2->userinfo->get();
	  $_SESSION['user']['userid']=$user_id = $user['id'];
	  $_SESSION['user']['username']=$user_name = filter_var($user['name'], FILTER_SANITIZE_SPECIAL_CHARS);
	  $email = filter_var($user['email'], FILTER_SANITIZE_EMAIL);
	  $profile_url 	= "";
	  $profile_image_url= filter_var($user['picture'], FILTER_VALIDATE_URL);
	  $personMarkup = "$email<div><img src='$profile_image_url?sz=50'></div>";
	  $_SESSION['user']['token'] = $gClient->getAccessToken();
}
?>

<?php
  if(isset($authUrl)) {
    echo '<a class="userData" href="'.$authUrl.'"><img src="images/google-login-button.png" /></a>';
  } else {
   print "<a class='userData' href='./logout'>Logout</a>";
   $mysqli = new mysqli($hostname, $db_username, $db_password, $db_name);
	
	if ($mysqli->connect_error) die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
	
		
	$user_exist = $mysqli->query("SELECT COUNT(google_id) as usercount FROM google_users WHERE google_id=$user_id")->fetch_object()->usercount; 

	if(!$user_exist)
	{ 	
		$mysqli->query("INSERT INTO google_users (google_id, google_name, google_email, google_link, google_picture_link) 
		VALUES ($user_id, '$user_name','$email','$profile_url','$profile_image_url')");
	}
  }
?>

