<?php

if (!class_exists("RB_Lookbook")) {
    class RB_Lookbook
    {
        function __construct()
        {
            require_once(RB_LOOKBOOK_PATH . "/utilities/utilities.rb-lookbook_query.php");

            require_once(RB_LOOKBOOK_PATH . "/admin/models/class.rb-lookbook-cpt.php");

            require_once(RB_LOOKBOOK_PATH . "/restApi/rb-lookbook-rest-api.php");
        }

        public static function init()
        {
            $self = new self();

            RB_Lookbook_Post_Type::init();

            RB_Lookbook_Rest_Api::init();

            add_action("init", [$self, "change_post_object_label"]);

            add_action("init", [$self, "remove_post_type_lookbook_support"]);

            add_action("admin_menu", [$self, "change_post_menu_label"]);

            add_action("admin_enqueue_scripts", [$self, "register_admin_scripts"], 999);
        }

        /**
         * Custom labels menu for post-type RB_LOOKBOOK_POST_TYPE
         */
        public function change_post_menu_label()
        {
            global $menu;
            $menu[5][6] = "dashicons-slides";
            $menu[5][0] = "RB LookBooks";

            global $submenu;
            $submenu["edit.php"][5][0] = "LookBooks";
        }

        /**
         * Custom labels object for post-type RB_LOOKBOOK_POST_TYPE
         */
        public function change_post_object_label()
        {
            global $wp_post_types;

            $labels = $wp_post_types[RB_LOOKBOOK_POST_TYPE]->labels;
            $labels->name = "LookBooks";
            $labels->singular_name = "LookBook";
            $labels->menu_icon = "dashicons-slides";
            $labels->new_item = "LookBook";
        }

        /**
         * Remove editor for post-type RB_LOOKBOOK_POST_TYPE
         */
        public function remove_post_type_lookbook_support()
        {
            remove_post_type_support(RB_LOOKBOOK_POST_TYPE, "editor");
        }

        /**
         * Admin Scripts on pages the post-type RB_LOOKBOOK_POST_TYPE
         */
        public function register_admin_scripts()
        {
            global $typenow, $taxnow;
            if (RB_LOOKBOOK_POST_TYPE === $typenow && !$taxnow) {
                wp_enqueue_media();

                wp_register_script(
                    "meta-box-image",
                    RB_LOOKBOOK_URL . "/admin/js/admin.js",
                    ["jquery"]
                );

                wp_localize_script(
                    "meta-box-image",
                    "meta_image",
                    ["title" => __("Gallerie LookBook", RB_TEXTDOMAIN)]
                );

                wp_enqueue_script("meta-box-image");
            }
        }
    }
}
