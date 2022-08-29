<?php

if (!class_exists("RB_Woo_Commerce_Post_Type")) {
    class RB_Woo_Commerce_Post_Type
    {
        /**
         * Init hooks
         *
         * @return void
         */
        public static function init(): void
        {
            $self = new self();

            $custom_taxonomy = new MN_Taxonomy;

            $self->custom_category($custom_taxonomy);

            $self->custom_tag($custom_taxonomy);

            $self->custom_periode($custom_taxonomy);

            $self->custom_podium($custom_taxonomy);

            $self->custom_condition($custom_taxonomy);

            $self->custom_rarity($custom_taxonomy);

            $self->custom_single_stitch($custom_taxonomy);

            $self->custom_theme($custom_taxonomy);

            add_action("init", [$self, "rb_register_taxonomy"]);

            add_filter(
                "gettext",
                [$self, "rb_change_backend_product_regular_price"],
                100,
                3
            );

            add_action(
                "woocommerce_product_options_pricing",
                [$self, "rb_woocommerce_product_options_pricing"]
            );

            add_action(
                "woocommerce_process_product_meta_simple",
                [$self, "rb_woocommerce_process_product_meta_simple"],
                10,
                1
            );

            add_action("add_meta_boxes", [$self, "rb_add_meta_boxes"]);

            add_action("save_post", [$self, "rb_save_post"], 10, 2);
        }

        /**
         * Add Taxonomy podium
         *
         * @return void
         */
        public function rb_register_taxonomy(): void
        {
            $labels = [
                "name"                       => _x("Podium", "Taxonomy General Name", RB_TEXTDOMAIN),
                "singular_name"              => _x("Podium", "Taxonomy Singular Name", RB_TEXTDOMAIN),
                "menu_name"                  => __("Podium", RB_TEXTDOMAIN),
                "all_items"                  => __("Podium", RB_TEXTDOMAIN),
                "parent_item"                => __("Parent Podium", RB_TEXTDOMAIN),
                "parent_item_colon"          => __("Parent Podium:", RB_TEXTDOMAIN),
                "new_item_name"              => __("Nouveau Podium", RB_TEXTDOMAIN),
                "add_new_item"               => __("Ajouter Podium", RB_TEXTDOMAIN),
                "edit_item"                  => __("Editer Podium", RB_TEXTDOMAIN),
                "update_item"                => __("Mettre à jour le Podium", RB_TEXTDOMAIN),
                "view_item"                  => __("Voir Podium", RB_TEXTDOMAIN),
                "separate_items_with_commas" => __("Separate items with commas"),
                "add_or_remove_items"        => __("Add or remove items"),
                "choose_from_most_used"      => __("Choose from the most used"),
                "popular_items"              => __("Popular Items"),
                "search_items"               => __("Search Items"),
                "not_found"                  => __("Not Found"),
                "no_terms"                   => __("No items"),
                "items_list"                 => __("Items list"),
                "items_list_navigation"      => __("Items list navigation"),
            ];

            $args = [
                "labels"                     => $labels,
                "hierarchical"               => false,
                "public"                     => true,
                "show_ui"                    => true,
                "show_admin_column"          => false,
                "show_in_nav_menus"          => true,
                "show_tagcloud"              => false,
                "show_in_rest"               => true,
                "rest_base"                  => "rb_podium",
            ];

            register_taxonomy("rb_podium", ["product"], $args);

            $labels = [
                "name"                       => _x("Périodes", "Taxonomy General Name", RB_TEXTDOMAIN),
                "singular_name"              => _x("Période", "Taxonomy Singular Name", RB_TEXTDOMAIN),
                "menu_name"                  => __("Périodes", RB_TEXTDOMAIN),
                "all_items"                  => __("Toutes les périodes", RB_TEXTDOMAIN),
                "parent_item"                => __("Parent Période", RB_TEXTDOMAIN),
                "parent_item_colon"          => __("Parent Période:", RB_TEXTDOMAIN),
                "new_item_name"              => __("Nouvelle Période", RB_TEXTDOMAIN),
                "add_new_item"               => __("Ajouter Période", RB_TEXTDOMAIN),
                "edit_item"                  => __("Editer Période", RB_TEXTDOMAIN),
                "update_item"                => __("Mettre à jour la Période", RB_TEXTDOMAIN),
                "view_item"                  => __("Voir Période", RB_TEXTDOMAIN),
                "separate_items_with_commas" => __("Separate items with commas"),
                "add_or_remove_items"        => __("Add or remove items"),
                "choose_from_most_used"      => __("Choose from the most used"),
                "popular_items"              => __("Popular Items"),
                "search_items"               => __("Search Items"),
                "not_found"                  => __("Not Found"),
                "no_terms"                   => __("No items"),
                "items_list"                 => __("Items list"),
                "items_list_navigation"      => __("Items list navigation"),
            ];

            $args = [
                "labels"                     => $labels,
                "hierarchical"               => false,
                "public"                     => true,
                "show_ui"                    => true,
                "show_admin_column"          => false,
                "show_in_nav_menus"          => true,
                "show_tagcloud"              => false,
                "show_in_rest"               => true,
                "rest_base"                  => "rb_periode",
            ];

            register_taxonomy("rb_periode", ["product"], $args);
        }

        /**
         * Add Taxonomy product_cat meta data
         * @param MN_Taxonomy $custom_taxonomy
         * @return void
         */
        public function custom_category(MN_Taxonomy $custom_taxonomy): void
        {
            $custom_taxonomy->mn_add_taxonomy_image(
                "product_cat",
                "rb_gallery_id",
                "Gallerie étiquettes",
                RB_TEXTDOMAIN,
                true
            );

            $custom_taxonomy->mn_add_taxonomy_image(
                "product_cat",
                "rb_banner",
                "Image bannière",
                RB_TEXTDOMAIN
            );

            $custom_taxonomy->mn_add_taxonomy_image(
                "product_cat",
                "rb_icon_button",
                "Image boutton",
                RB_TEXTDOMAIN
            );

            $custom_taxonomy->mn_add_taxonomy_image(
                "product_cat",
                "rb_icon_filter",
                "Image filtre",
                RB_TEXTDOMAIN
            );
        }

        /**
         * Add Taxonomy product_tag meta data
         * @param MN_Taxonomy $custom_taxonomy
         * @return void
         */
        public function custom_tag(MN_Taxonomy $custom_taxonomy): void
        {
            $custom_taxonomy->mn_add_taxonomy_image(
                "product_tag",
                null,
                null,
                RB_TEXTDOMAIN,
            );
        }

        /**
         * Add Taxonomy pa_condition meta data
         * @param MN_Taxonomy $custom_taxonomy
         * @return void
         */
        public function custom_condition(MN_Taxonomy $custom_taxonomy): void
        {
            $custom_taxonomy->mn_add_taxonomy_image(
                "pa_condition",
                null,
                null,
                RB_TEXTDOMAIN
            );
        }

        /**
         * Add Taxonomy pa_rarete meta data
         * @param MN_Taxonomy $custom_taxonomy
         * @return void
         */
        public function custom_rarity(MN_Taxonomy $custom_taxonomy): void
        {
            $custom_taxonomy->mn_add_taxonomy_image(
                "pa_rarete",
                null,
                null,
                RB_TEXTDOMAIN
            );

            $custom_taxonomy->mn_add_taxonomy_image(
                "pa_rarete",
                "rb_banner",
                "Image bannière",
                RB_TEXTDOMAIN
            );

            $custom_taxonomy->mn_add_taxonomy_image(
                "pa_rarete",
                "rb_cover_contrast",
                "Icon secondaire",
                RB_TEXTDOMAIN
            );
        }

        /**
         * Add Taxonomy rb_podium meta data
         * @param MN_Taxonomy $custom_taxonomy
         * @return void
         */
        public function custom_podium(MN_Taxonomy $custom_taxonomy): void
        {
            $custom_taxonomy->mn_add_taxonomy_image(
                "rb_podium",
                null,
                null,
                RB_TEXTDOMAIN
            );

            $custom_taxonomy->mn_add_taxonomy_image(
                "rb_podium",
                "rb_icon_podium",
                "Image podium",
                RB_TEXTDOMAIN,
                null,
                true
            );
        }

        /**
         * Add Taxonomy rb_periode meta data
         * @param MN_Taxonomy $custom_taxonomy
         * @return void
         */
        public function custom_periode(MN_Taxonomy $custom_taxonomy): void
        {
            $custom_taxonomy->mn_add_taxonomy_image(
                "rb_periode",
                "rb_gallery_vintage",
                "Gallerie vintage",
                RB_TEXTDOMAIN,
                true
            );

            $custom_taxonomy->mn_add_taxonomy_image(
                "rb_periode",
                "rb_gallery_nike",
                "Gallerie nike",
                RB_TEXTDOMAIN,
                true,
                true
            );

            $custom_taxonomy->mn_add_taxonomy_image(
                "rb_periode",
                "rb_gallery_hype",
                "Gallerie hype",
                RB_TEXTDOMAIN,
                true,
                true
            );
        }

        /**
         * Add Taxonomy pa_single-stitch meta data
         *
         * @param MN_Taxonomy $custom_taxonomy
         * @return void
         */
        public function custom_single_stitch(MN_Taxonomy $custom_taxonomy): void
        {
            $custom_taxonomy->mn_add_taxonomy_image(
                "pa_single-stitch",
                null,
                null,
                RB_TEXTDOMAIN
            );
        }

        /**
         * Add Taxonomy pa_theme meta data
         *
         * @param MN_Taxonomy $custom_taxonomy
         * @return void
         */
        public function custom_theme(MN_Taxonomy $custom_taxonomy): void
        {
            $custom_taxonomy->mn_add_taxonomy_select(
                "pa_theme",
                "product_cat",
                'rb_category',
                'Catégorie',
                RB_TEXTDOMAIN,
                true
            );
        }

        /**
         * Change WooCommerce labels price
         */
        public function rb_change_backend_product_regular_price($translated_text, $text, $domain)
        {
            global $pagenow, $post_type;

            if (
                is_admin() &&
                in_array($pagenow, ["post.php", "post-new.php"]) &&
                $post_type  === "product" &&
                $text  === "Regular price"  &&
                $domain === "woocommerce"
            ) $translated_text =  __("Estimation réelle", $domain);

            if (
                is_admin() &&
                in_array($pagenow, ["post.php", "post-new.php"]) &&
                $post_type  === "product" &&
                $text  === "Sale price"  &&
                $domain === "woocommerce"
            ) $translated_text =  __("Prix de vente", $domain);

            return $translated_text;
        }

        /**
         * Add WooCommerce additional options price field
         */
        public function rb_woocommerce_product_options_pricing()
        {
            woocommerce_wp_text_input([
                "id"    => "rb_profit",
                "class" => "wc_input_wholesale_price short",
                "label" => __("Bénéfices", RB_TEXTDOMAIN) . " (" . get_woocommerce_currency_symbol() . ")",
                "type"  => "text"
            ]);

            woocommerce_wp_text_input([
                "id"    => "rb_marcket_price",
                "class" => "wc_input_wholesale_price short",
                "label" => __("Prix du marché", RB_TEXTDOMAIN) . " (%)",
                "type"  => "text"
            ]);
        }

        /**
         * Save product data
         */
        public function rb_woocommerce_process_product_meta_simple($product_id)
        {
            if (isset($_POST["rb_profit"]) && $_POST["rb_profit"] > 0)
                update_post_meta(
                    $product_id,
                    "rb_profit",
                    $_POST["rb_profit"]
                );

            if (isset($_POST["rb_marcket_price"]) && $_POST["rb_marcket_price"] > 0)
                update_post_meta(
                    $product_id,
                    "rb_marcket_price",
                    $_POST["rb_marcket_price"]
                );
        }

        /**
         * Add meta boxes
         */
        public function rb_add_meta_boxes()
        {
            add_meta_box(
                "rb_tag_upload_meta_box",
                __("Tag produit", RB_TEXTDOMAIN),
                [$this, "rb_tag_upload_meta_box"],
                'product'
            );
        }

        /**
         * Render Meta Box content.
         *
         * @param WP_Post|instance $post The current post object.
         */
        public function rb_tag_upload_meta_box($post)
        {
            require_once RB_PATH . "/woocommerce/admin/views/rb-woocommerce_tag_metabox.php";
        }

        /**
         * save post meta-data RB_LOOKBOOK_POST_TYPE
         *
         * @param WP_Post|int $post_id The current post ID.
         */
        public function rb_save_post($post_id)
        {
            if (isset($_POST["rb_woocommerce_tag"])) {
                if (!wp_verify_nonce(
                    $_POST["rb_woocommerce_tag"],
                    "rb_woocommerce_tag"
                )) {
                    return;
                }
            }

            if (defined("DOING_AUTOSAVE") && DOING_AUTOSAVE) {
                return;
            }

            if (
                isset($_POST["post_type"]) &&
                "product" === $_POST["post_type"]
            ) {
                if (!current_user_can("edit_page", $post_id)) {
                    return;
                }
            }
            if (!current_user_can("edit_post", $post_id)) {
                return;
            }

            if (isset($_POST["action"]) && "editpost" === $_POST["action"]) {
                $old_gallery = get_post_meta(
                    $post_id,
                    "rb_thumbnail_tag",
                    true
                );
                $new_gallery = esc_attr($_POST["rb_thumbnail_tag"]);

                $new_gallery ?
                    update_post_meta(
                        $post_id,
                        "rb_thumbnail_tag",
                        $new_gallery,
                        $old_gallery
                    ) :
                    update_post_meta(
                        $post_id,
                        "rb_thumbnail_tag",
                        "",
                        $old_gallery
                    );
            }
        }
    }
}
