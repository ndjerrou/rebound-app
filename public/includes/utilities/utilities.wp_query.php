<?php

function rb_get_posts($args, $id = null)
{
    $my_query = new WP_Query($args);

    $posts = [];

    if ($my_query->have_posts()) {
        while ($my_query->have_posts()) {
            $my_query->the_post();

            if (
                !$id || ($id &&
                    $id === get_the_ID())
            ) {
                $post = [];

                $post_data = get_post(get_the_ID());

                if ($post_data) foreach ($post_data as $key => $value)
                    $post[$key] = $value;

                $thumbnail_id = get_post_thumbnail_id(get_the_ID());

                if ($thumbnail_id) $post[rb_add_prefix("cover")] = rb_get_thumbnail_src($thumbnail_id);

                $meta_data = get_post_meta(get_the_ID());

                if ($meta_data) foreach ($meta_data as $key => $value)
                    switch ($key) {
                        case RB_LOOKBOOK_PROP_GALLERY:
                            $post["rb_gallery"] = rb_format_thumbnail(get_post_meta(get_the_ID(), $key, true));

                        case "mn_thumbnail_id":
                            $post["mn_thumbnail_id"] = rb_format_thumbnail(get_post_meta(get_the_ID(), $key, true));

                        default:
                            $post[$key] = get_post_meta(get_the_ID(), $key, true);

                            break;
                    }

                $categories = rb_get_terms_taxonomy("category", get_the_ID());

                if ($categories) foreach ($categories as $key => $category)
                    $categories[$key] = array_filter(
                        $category,
                        "rb_filter_term",
                        ARRAY_FILTER_USE_KEY
                    );

                $post[rb_add_prefix("category")] = $categories;

                $tags = rb_get_terms_taxonomy("post_tag", get_the_ID());
                if ($tags) {
                    foreach ($tags as $key => $tag)
                        $tags[$key] = array_filter(
                            $tag,
                            "rb_filter_term",
                            ARRAY_FILTER_USE_KEY
                        );

                    $post[rb_add_prefix("tag")] = $tags;
                }

                $posts[] = $post;
            }
        }

        wp_reset_postdata();
    }

    return $id ? $posts[0] : $posts;
}

function rb_get_terms_taxonomy($taxonomy, $post_id = null)
{
    $terms = !$post_id ? get_terms([
        "taxonomy" => $taxonomy,
        "hide_empty" => false,
    ]) : get_the_terms($post_id, $taxonomy);

    if ($terms instanceof \WP_Error || empty($terms) || !$terms) return $terms;

    $terms_data = [];

    foreach ($terms as $term) {
        $term_data = [];

        foreach ($term as $key => $value) {
            $term_data[$key] = $value;
        }

        $term_metas = get_term_meta($term->term_id);

        foreach ($term_metas as $meta_key => $value) {
            //* TODO add type picture to meta key for better filter
            $allowed = ["mn_thumbnail_id", "thumbnail_id", "rb_banner", "rb_gallery_id", "rb_icon_button", "rb_icon_podium", "rb_icon_filter", "rb_gallery_vintage", "rb_gallery_nike", "rb_gallery_hype", "rb_category"];

            $term_meta = get_term_meta($term->term_id, $meta_key, true);

            if (in_array($meta_key, $allowed)) {
                $src = rb_format_thumbnail($term_meta);

                if ($src) $term_data[$meta_key] = $src;
            } else
                $term_data[$meta_key] = $term_meta;
        }

        $terms_data[] = $term_data;
    }

    return $terms_data;
}

function rb_add_prefix($string)
{
    return "rb_" . $string;
}

function rb_format_taxonony($id, $slug, $name, $src = null, $gallery = null)
{
    $result = [
        "ID"    => $id,
        "slug"  => $slug,
        "name"  => $name
    ];

    if ($src) $result += ["cover" => $src];

    if ($gallery) $result += ["gallery" => $gallery];

    return $result;
}

function rb_format_thumbnail($thumbnail_id)
{
    $result = [];

    if (is_array($thumbnail_id)) {
        foreach ($thumbnail_id as $i => $id) {
            $result = [
                "id"    => $thumbnail_id[$i],
            ];

            $src = rb_get_thumbnail_src($id);

            if ($src) {
                $result += ["src" => $src];

                $tag_content = sanitize_title(get_post($id)->post_content) === "tag";

                if ($tag_content)
                    $tag_excerpt = sanitize_title(get_post($id)->post_excerpt) ?? false;

                if ($tag_content) $result += [
                    "tag_year" => $tag_excerpt
                ];

                $thumbnail_id[$i] = $result;
            }
        }

        if (count($thumbnail_id) === 1) $thumbnail_id = $thumbnail_id[0];
    } else {
        $result = [
            "id"    => $thumbnail_id,
        ];
        $src = rb_get_thumbnail_src($thumbnail_id);

        if ($src) {
            $result += ["src" => $src];

            $thumbnail_id = $result;
        }
    }

    return $thumbnail_id;
}

function rb_get_thumbnail_src($thumbnail_id)
{
    $base_url = "/wp-content/uploads/";

    $src = false;

    $data_src = wp_get_attachment_metadata($thumbnail_id);

    if ($data_src) $src = $base_url . $data_src["file"];

    return $src;
}

function rb_filter_term($key)
{
    $allowed = [
        "term_id", "name", "slug", "taxonomy", "mn_thumbnail_id",
        "thumbnail_id", "rb_banner", "rb_gallery_id", "rb_icon_button",
        "rb_icon_filter", "description", "rb_gallery_vintage", "rb_gallery_nike", "rb_gallery_hype",
        "rb_category", "rb_icon_podium"
    ];

    return in_array($key, $allowed);
}
