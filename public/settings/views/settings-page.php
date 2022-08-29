<?php
$active_tab = $_GET['tab'] ?? 'paypal_options';
?>

<div class="wrap">
    <h1><?= esc_html(get_admin_page_title()); ?></h1>
    <h2 class="nav-tab-wrapper">
        <a href="?page=rb_options&tab=paypal_options" class="nav-tab <?= $active_tab === 'paypal_options' ? 'nav-tab-active' : ''; ?>"><?php esc_html_e('Paypal Options', RB_TEXTDOMAIN); ?></a>
        <a href="?page=rb_options&tab=social_network_options" class="nav-tab <?= $active_tab === 'social_network_options' ? 'nav-tab-active' : ''; ?>"><?php esc_html_e('Réseaux Sociaux Options', RB_TEXTDOMAIN); ?></a>
    </h2>
    <form action="options.php" method="post">
        <?php
        if ($active_tab === 'paypal_options') {
            settings_fields('rb_group');
            do_settings_sections('rb_page1');
        } else {
            settings_fields('rb_group');
            do_settings_sections('rb_page2');
        }
        submit_button();
        ?>
    </form>
</div>
