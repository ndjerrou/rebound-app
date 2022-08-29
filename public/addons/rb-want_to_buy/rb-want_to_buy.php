<?php

if (!class_exists("RB_Want_To_Buy")) {
    class RB_Want_To_Buy
    {
        function __construct()
        {
            require_once(RB_WANT_TO_BUY_PATH . "/utilities/utilities.rb-want_to_buy_query.php");

            require_once(RB_WANT_TO_BUY_PATH . "/admin/models/class.rb-want_to_buy-cpt.php");

            require_once(RB_WANT_TO_BUY_PATH . "/restApi/rb-want_to_buy-rest-api.php");
        }

        public static function init()
        {
            $self = new self();

            RB_Want_To_Buy_Post_Type::init();

            RB_Want_To_Buy_Rest_Api::init();

            add_action(
                "admin_enqueue_scripts",
                [$self, "register_admin_scripts"],
                999
            );
        }

        /**
         * Admin Scripts on pages the post-type RB_WANT_TO_BUY_POST_TYPE
         */
        public function register_admin_scripts()
        {
            global $typenow;
            if ($typenow === RB_WANT_TO_BUY_POST_TYPE) {
                wp_enqueue_style(
                    "rb-want_to_buy-admin",
                    RB_WANT_TO_BUY_URL . "/admin/css/admin.css"
                );
            }
        }
    }
}
