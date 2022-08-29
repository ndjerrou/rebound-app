<?php

function rb_get_notifications($post_status = "any", $id = null)
{
    $args = [
        "post_type" => RB_NOTIFICATION_POST_TYPE,
        "post_status" => $post_status,
        "posts_per_page" => -1
    ];

    $notifications = rb_get_posts($args, $id);

    foreach ($notifications as $i => $notification) {
        $notifications[$i] = array_filter(
            $notification,
            "rb_filter_props_notification",
            ARRAY_FILTER_USE_KEY
        );
    }

    return $notifications;
}

function rb_filter_props_notification($key)
{
    $allowed  = [
        "ID", "post_title", "post_status", "post_name", "post_type",
        "_email"
    ];

    return in_array($key, $allowed);
}

function rb_check_notification($title, $email)
{
    $args = [
        "post_type" => RB_NOTIFICATION_POST_TYPE,
        "posts_per_page" => -1
    ];

    $my_query = new WP_Query($args);

    $isValidEmail = true;

    if ($my_query->have_posts()) {
        while ($my_query->have_posts()) {
            $my_query->the_post();

            $meta_email = get_post_meta(get_the_id(), RB_NOTIFICATION_PROP_EMAIL, true);

            if ($email === $meta_email && $title === get_the_title()) $isValidEmail = false;
        }

        wp_reset_postdata();
    }

    return $isValidEmail;
}
