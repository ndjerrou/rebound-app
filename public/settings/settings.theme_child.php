<?php

/**
 * Load child theme.
 */
function twentytwentytwo_styles()
{
    $theme_version = wp_get_theme()->get('Version');

    $version_string = is_string($theme_version) ? $theme_version : false;

    wp_enqueue_style(
        'twentytwentytwo-style',
        get_template_directory_uri() . '/style.css',
        [],
        $version_string
    );

    wp_enqueue_style(
        "rebound-style",
        get_stylesheet_uri(),
        ["twentytwentytwo-style"],
        $theme_version
    );
}

/**
 * Load child theme text domain.
 */
function twentytwentytwo_child_setup()
{
    $path = get_stylesheet_directory() . "/languages";
    load_child_theme_textdomain(RB_TEXTDOMAIN, $path);
}

/**
 * Register the custom column.
 *
 * @param array $columns Existing columns.
 * @return array Columns with custom column added.
 */
function rb_admin_columns($columns)
{
    $post_type = get_post_type();

    if ($post_type !== "product" && $post_type !== "rb-notification") $columns = [
        "cb"                => "<input type='checkbox' />",
        "featured_image"    => __("Image", RB_TEXTDOMAIN),
        "title"             => "Titre",
        "date"              => "Date"
    ];

    return $columns;
}

/**
 * Fires in each custom column on the Posts list table.
 *
 * This hook only fires if the current post type is hierarchical,
 * such as pages.
 *
 * @param string $column The name of the column to display.
 * @param WP_Post|int $post_id The current post ID.
 */
function rb_admin_columns_image($column, $post_id)
{
    switch ($column) {
        case "featured_image":
            echo the_post_thumbnail([50, 50]);

            break;
    }
}

/**
 * Load react app in a shortcode.
 */
function rebound_react_app($atts = [], $content = null, $tag = 'rb_react_app')
{
    $rb_data = [
        "lookbooks" => rb_get_lookbooks(RB_LOOKBOOK_POST_TYPE),
        "videos"    => rb_get_videos(RB_VIDEO_POST_TYPE)
    ];

    header("Access-Control-Allow-Origin: *");

    wp_deregister_style('twentytwentytwo-style');

    wp_deregister_style('rebound-style');

    wp_enqueue_script(
        'rebound_react_script',
        get_stylesheet_directory_uri() . '/frontend/build/index.js',
        ['react', 'react-dom', 'wp-element'],
        RB_VERSION,
        true
    );

    wp_localize_script('rebound_react_script', 'rbData', $rb_data);

    wp_enqueue_style(
        'rebound_react_style',
        get_stylesheet_directory_uri() . '/frontend/build/index.css',
        [],
        RB_VERSION
    );

    ob_start();
?>
    <div id="root">App goes here</div>
<?php

    return ob_get_clean();
}
