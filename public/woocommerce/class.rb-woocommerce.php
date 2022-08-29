<?php

if (!class_exists("RB_Woocommerce") && is_plugin_active("woocommerce/woocommerce.php")) {
    class RB_Woocommerce
    {
        function __construct()
        {
            require_once(RB_PATH . "/woocommerce/utilities/utilities.rb-woocommerce_query.php");

            require_once(RB_PATH . "/woocommerce/admin/models/class.rb-woocommerce-cpt.php");

            require_once(RB_PATH . "/woocommerce/restApi/rb-woocommerce-rest-api.php");
        }

        public static function init()
        {
            $self = new self();

            RB_Woo_Commerce_Post_Type::init();

            RB_Woo_Commerce_Rest_Api::init();

            add_action("admin_enqueue_scripts", [$self, "register_admin_scripts"], 999);

            add_filter("manage_edit-product_columns", "rb_display_custom_taxonomy_column_heading", 10, 1);
            function rb_display_custom_taxonomy_column_heading($columns)
            {
                unset($columns["sku"]);
                unset($columns["featured"]);

                $offset = 6;

                $new_columns =
                    array_slice(
                        $columns,
                        0,
                        $offset,
                        true
                    ) + [
                        "rb_podium" => __("Podium", RB_TEXTDOMAIN)
                    ] + array_slice(
                        $columns,
                        $offset,
                        NULL,
                        true
                    );

                return $new_columns;
            }

            add_action("manage_product_posts_custom_column", "rb_display_custom_taxonomy_column_value", 10, 2);

            function rb_display_custom_taxonomy_column_value($column, $postid)
            {
                if ($column === "rb_podium") {
                    $terms = rb_get_terms_taxonomy("rb_podium", $postid);

                    if (isset($terms[0]["name"])) echo $terms[0]["name"];
                }
            }
        }

        /**
         * Admin Scripts on pages the post-type RB_LOOKBOOK_POST_TYPE
         */
        public function register_admin_scripts()
        {
            global $typenow, $taxnow;
            if ("product" === $typenow && !$taxnow) {
                wp_enqueue_media();

                wp_register_script(
                    "meta-box-image",
                    RB_URL . "/woocommerce/admin/js/admin.js",
                    ["jquery"]
                );

                wp_localize_script(
                    "meta-box-image",
                    "meta_image",
                    ["title" => __("Gallerie Images", RB_TEXTDOMAIN)]
                );

                wp_enqueue_script("meta-box-image");
            }
        }
    }
}
