<?php

function rb_get_videos($post_status = "any")
{
    $args = [
        "post_type" => RB_VIDEO_POST_TYPE,
        "post_status" => $post_status,
        "posts_per_page" => -1
    ];

    $videos = rb_get_posts($args);

    foreach ($videos as $i => $video) {
        $videos[$i] = array_filter(
            $video,
            "rb_filter_props_video",
            ARRAY_FILTER_USE_KEY
        );
    }

    return $videos;
}

function rb_filter_props_video($key)
{
    $allowed  = [
        "ID", "post_title", "post_status", "post_name", "post_type", "rb_cover",
        "_link_url"
    ];

    return in_array($key, $allowed);
}
