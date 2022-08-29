<?php

function rb_get_lookbooks($post_status = "any")
{
    $args = [
        "post_type" => RB_LOOKBOOK_POST_TYPE,
        "post_status" => $post_status,
        "posts_per_page" => -1
    ];

    $lookbooks = rb_get_posts($args);

    foreach ($lookbooks as $i => $lookbook) {
        $lookbooks[$i] = array_filter(
            $lookbook,
            "rb_filter_props_lookbook",
            ARRAY_FILTER_USE_KEY
        );

        if (isset($lookbook["rb_category"]))
            $lookbooks[$i]["rb_category"] = $lookbook["rb_category"][0];

        if (isset($lookbook["rb_tag"]))
            $lookbooks[$i]["rb_tag"] = $lookbook["rb_tag"][0];
    }

    return $lookbooks;
}

function rb_filter_props_lookbook($key)
{
    $allowed  = [
        "ID", "post_title", "post_status", "post_name", "post_type",
        "rb_cover", "rb_gallery", "rb_category", "rb_is_new"
    ];

    return in_array($key, $allowed);
}
