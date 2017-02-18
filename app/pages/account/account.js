$('#logout_button').click(() => window.GreenhouseGames.client.signOut().then(window.GreenhouseGames.authHelpers.hideAuth));
$('#twitterLogin_button').click(() => window.GreenhouseGames.client.signInWithPopup('twitter').then(window.GreenhouseGames.authHelpers.loginSuccess).catch(window.GreenhouseGames.authHelpers.loginError));
$('#facebookLogin_button').click(() => window.GreenhouseGames.client.signInWithPopup('facebook').then(window.GreenhouseGames.authHelpers.loginSuccess).catch(window.GreenhouseGames.authHelpers.loginError));
$('#guestLogin_button').click(() => window.GreenhouseGames.client.signInAnonymously().then(window.GreenhouseGames.authHelpers.loginSuccess).catch(window.GreenhouseGames.authHelpers.loginError));
