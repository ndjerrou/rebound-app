<?php

if (!class_exists("RB_Notification")) {
    class RB_Notification
    {
        function __construct()
        {
            require_once(RB_NOTIFICATION_PATH . "/utilities/utilities.rb-notification_query.php");

            require_once(RB_NOTIFICATION_PATH . "/admin/models/class.rb-notification-cpt.php");

            require_once(RB_NOTIFICATION_PATH . "/restApi/rb-notification-rest-api.php");
        }

        public static function init()
        {
            $self = new self();

            RB_Notification_Post_Type::init();

            RB_Notification_Rest_Api::init();

            add_action(
                "admin_enqueue_scripts",
                [$self, "register_admin_scripts"],
                999
            );
        }

        /**
         * Admin Scripts on pages the post-type RB_NOTIFICATION_POST_TYPE
         */
        public function register_admin_scripts()
        {
            global $typenow;
            if ($typenow === RB_NOTIFICATION_POST_TYPE) {
                wp_enqueue_style(
                    "rb-notification-admin",
                    RB_NOTIFICATION_URL . "/admin/css/admin.css"
                );
            }
        }
    }
}
