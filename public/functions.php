<?php

defined('ABSPATH') || exit;

require_once 'constants/constants.php';

require_once 'includes/utilities/utilities.wp_query.php';

require_once 'includes/taxonomy/mn-taxonomy.php';

// Setup child theme
require_once 'settings/class.rb-settings.php';

add_action('after_setup_theme', ['RB_Settings', 'init']);

require_once 'settings/settings.theme_child.php';

add_action('wp_enqueue_scripts', 'twentytwentytwo_styles');

add_action('after_setup_theme', 'twentytwentytwo_child_setup');

add_filter('manage_posts_columns', 'rb_admin_columns');

add_action('manage_posts_custom_column', 'rb_admin_columns_image', 10, 2);

add_shortcode('rb_react_app', 'rebound_react_app');

// Init addons
require_once 'addons/rb-lookbook/rb-lookbook.php';
add_action('after_setup_theme', ['RB_Lookbook', 'init']);

require_once 'addons/rb-video/rb-video.php';
add_action('after_setup_theme', ['RB_Video', 'init']);

require_once 'addons/rb-want_to_buy/rb-want_to_buy.php';
add_action('after_setup_theme', ['RB_Want_To_Buy', 'init']);

require_once 'addons/rb-notification/rb-notification.php';
add_action('after_setup_theme', ['RB_Notification', 'init']);

// Init woocommerce change
require_once 'woocommerce/class.rb-woocommerce.php';
add_action('after_setup_theme', ['RB_Woocommerce', 'init']);
