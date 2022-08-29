<?php

function rb_get_want_to_buys($post_status = "any")
{
    $args = [
        "post_type" => RB_WANT_TO_BUY_POST_TYPE,
        "post_status" => $post_status,
        "posts_per_page" => -1
    ];

    $want_to_buys = rb_get_posts($args);

    foreach ($want_to_buys as $i => $want_to_buy) {
        $want_to_buys[$i] = array_filter(
            $want_to_buy,
            "rb_filter_props_want_to_buy",
            ARRAY_FILTER_USE_KEY
        );
    }

    return $want_to_buys;
}

function rb_filter_props_want_to_buy($key)
{
    $allowed  = [
        "ID", "post_title", "post_status", "post_name", "post_type", "rb_cover",
        "_price"
    ];

    return in_array($key, $allowed);
}
