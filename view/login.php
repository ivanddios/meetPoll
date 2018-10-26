<?php
//file: view/users/login.php

require_once(__DIR__."/../../core/ViewManager.php");
$view = ViewManager::getInstance();
$view->setVariable("title", "Login");
$errors = $view->getVariable("errors");
?>

<?php if (!empty($errors)){ ?>
    <div class="alert alert-danger text-center" id="success-danger" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		<?=i18n($errors)?>
    </div>
<?php } ?>

 <div class="container">
        <div class="row center-row">
            <div class="col-lg-6 center-block">
                <div id="subtitle">
                    <h1><?= i18n("Login")?></h1>
                </div>
                <div class="col-lg-12 center-block2">
                    <form method="POST" action="index.php?controller=users&action=login">
                        <div id="inputLogin">
                            <div class="inputWithIconLogin inputIconBg">
                                <input type="text" name="username" placeholder="<?= i18n("Username")?>" required>
                                <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div id="inputLogin">
                            <div class="inputWithIconLogin inputIconBg">
                                <input type="password" name="passwd" placeholder="<?= i18n("Password")?>" required>
                                <?php if(isset($errors["general"])) { ?> 
                                        <div class="alert alert-danger" role="alert">
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                            <?=i18n($errors["general"])?>
                                        </div>
                                <?php } ?>
                                <i class="fa fa-lock fa-lg fa-fw" aria-hidden="true"></i>
                            </div>
							<button type="submit" class="btn btn-dark"><?= i18n("login")?></button>
                        </div>
                    </form>
                    <div id="loginPerdidaDeDatos">
                    <a class="font-weight-light" href="index.php?controller=users&action=register"><?= i18n("Not user?")?><?= i18n("Register here!")?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php $view->moveToDefaultFragment(); ?>
