<?php

function rb_get_posts_product($args)
{
    $my_query = new WP_Query($args);

    if ($my_query->have_posts()) {

        $products = [];

        while ($my_query->have_posts()) :
            $post = [];

            $my_query->the_post();

            $product = wc_get_product(get_the_ID());

            $post_data = get_post(get_the_ID());
            foreach ($post_data as $key => $value) {
                $post[$key] = $value;
            }

            $thumbnail_id = get_post_thumbnail_id(get_the_ID());
            if ($thumbnail_id)
                $post[rb_add_prefix("cover")] = rb_get_thumbnail_src($thumbnail_id);

            $gallery = $product->get_gallery_image_ids();

            if ($gallery)  foreach ($gallery as $key => $value) {
                $tag_content = sanitize_title(get_post($value)->post_content) === "tag";

                $gallery[$key] = rb_format_thumbnail($value);
                if ($tag_content)
                    $tag_excerpt = sanitize_title(get_post($value)->post_excerpt) ?? false;

                if ($tag_content) $gallery[$key] += [
                    "is_tag" => $tag_content, "tag_year" => $tag_excerpt
                ];
            }

            $post[rb_add_prefix("gallery")] = $gallery;

            $meta_data = get_post_meta(get_the_ID());
            if ($meta_data) foreach ($meta_data as $key => $value)
                switch ($key) {
                    case "rb_thumbnail_tag":
                        $post[$key] = rb_get_thumbnail_src(get_post_meta(get_the_ID(), $key, true));

                        break;

                    default:
                        $post[$key] = get_post_meta(get_the_ID(), $key, true);

                        break;
                }

            $terms = rb_get_terms_taxonomy("product_cat", $product->get_id());
            if ($terms) {
                foreach ($terms as $index => $term)
                    $terms[$index] = array_filter(
                        $term,
                        "rb_filter_term",
                        ARRAY_FILTER_USE_KEY
                    );

                $post[rb_add_prefix("product_cat")] = $terms;
            }

            $terms = rb_get_terms_taxonomy("product_tag", $product->get_id());
            if ($terms) {
                foreach ($terms as $index => $term)
                    $terms[$index] = array_filter(
                        $term,
                        "rb_filter_term",
                        ARRAY_FILTER_USE_KEY
                    );
                $post[rb_add_prefix("product_tag")] = $terms;
            }

            $terms = rb_get_terms_taxonomy("rb_podium", $product->get_id());
            if ($terms) {
                foreach ($terms as $index => $term)
                    $terms[$index] = array_filter(
                        $term,
                        "rb_filter_term",
                        ARRAY_FILTER_USE_KEY
                    );
                $post["rb_podium"] = $terms;
            }

            $terms = rb_get_terms_taxonomy("rb_periode", $product->get_id());
            if ($terms) {
                foreach ($terms as $index => $term)
                    $terms[$index] = array_filter(
                        $term,
                        "rb_filter_term",
                        ARRAY_FILTER_USE_KEY
                    );
                $post["rb_periode"] = $terms;
            }

            $attributes = $product->get_attributes();

            foreach ($attributes as $key => $value) {
                $terms = rb_get_terms_taxonomy($key, $product->get_id());

                if ($terms) foreach ($terms as $index => $term)
                    $terms[$index] = array_filter(
                        $term,
                        "rb_filter_term",
                        ARRAY_FILTER_USE_KEY
                    );

                $attributes[$key] = $terms;
            }

            $post[rb_add_prefix("product_attributes")] = $attributes;

            $products[] = $post;
        endwhile;

        wp_reset_postdata();
    }

    $products = rb_sort_products($products);

    return $products;
}

function rb_get_products($post_status = "any")
{
    $args = [
        "post_type"         => "product",
        "post_status"       => $post_status,
        "posts_per_page"    => -1
    ];

    $products = rb_get_posts_product($args);

    foreach ($products as $i => $product) {
        $products[$i] = array_filter(
            $product,
            "rb_filter_props_product",
            ARRAY_FILTER_USE_KEY
        );

        $product_cat = $products[$i][rb_add_prefix("product_cat")][0] ?? false;

        if ($product_cat) {
            $products[$i][rb_add_prefix("product_cat")] = $product_cat;
        }

        $product_tag = $product[rb_add_prefix("product_tag")][0] ?? false;

        if ($product_tag)
            $products[$i][rb_add_prefix("product_tag")] = $product_tag;

        $rb_podium = $product["rb_podium"][0] ?? false;
        if ($rb_podium)
            $products[$i]["rb_podium"] = $rb_podium;

        if (isset($product["rb_product_tag"])) {
            $is_new_product = false;

            foreach ($product["rb_product_tag"] as $tag)
                $tag["slug"] !== "nouveau-produit" ?
                    $products[$i][rb_add_prefix("podium")] = $tag["slug"] :
                    $is_new_product = true;

            $is_new_product ?
                $products[$i][rb_add_prefix("is_new_product")] = true :
                $products[$i][rb_add_prefix("is_new_product")] = false;
        }

        if (isset($product["rb_product_attributes"]))
            foreach ($product["rb_product_attributes"] as $key => $attributes) {
                $attribute = empty($attributes) ? $attributes : $attributes[0];
                $products[$i][str_replace("-", "_", rb_add_prefix($key))] = $attribute;
            }
    }

    $products = rb_sort_products($products);

    return $products;
}

function rb_sort_products($products)
{
    $sortable = [];

    foreach ($products as $value) {
        $podium = $value["rb_podium"]["slug"] ?? false;

        if ($podium === "mvp") $sortable[] = $value;
    }

    foreach ($products as $value) {
        $podium = $value["rb_podium"]["slug"] ?? false;

        if ($podium === "svp") $sortable[] = $value;
    }

    foreach ($products as $value) {
        $podium = $value["rb_podium"]["slug"] ?? false;

        if ($podium === "tvp") $sortable[] = $value;
    }

    foreach ($products as $value) {
        $podium = $value["rb_podium"]["slug"] ?? false;

        $rb_nouveau_produit = $value["rb_product_tag"] ?? false;

        if ($rb_nouveau_produit && !$podium)
            $sortable[] = $value;
    }

    foreach ($products as $value) {
        $podium = $value["rb_podium"]["slug"] ?? false;

        $rb_nouveau_produit = $value["rb_product_tag"] ?? false;

        if (!$rb_nouveau_produit && !$podium)
            $sortable[] = $value;
    }

    return $sortable;
}

function rb_filter_props_product($key)
{
    $allowed = [
        "ID", "post_title", "post_status", "post_name", "post_type",
        "rb_cover", "rb_gallery", "rb_thumbnail_tag", "rb_product_cat", "rb_product_tag",
        "_regular_price", "_sale_price", "_stock", "_stock_status", "rb_pa_production_year",
        "rb_pa_condition", "rb_pa_rarete", "rb_pa_mensurations",
        "rb_pa_single_stitch", "rb_pa_taille", "_price", "rb_profit",
        "rb_marcket_price", "rb_podium"
    ];

    return in_array($key, $allowed);
}
