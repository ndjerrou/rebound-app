<?php

if (!class_exists("RB_Video")) {
    class RB_Video
    {
        function __construct()
        {
            require_once(RB_VIDEO_PATH . "/utilities/utilities.rb-video_query.php");

            require_once(RB_VIDEO_PATH . "/admin/models/class.rb-video-cpt.php");

            require_once(RB_VIDEO_PATH . "/restApi/rb-video-rest-api.php");
        }

        public static function init()
        {
            $self = new self();

            RB_Video_Post_Type::init();

            RB_video_Rest_Api::init();

            add_action(
                "admin_enqueue_scripts",
                [$self, "register_admin_scripts"],
                999
            );
        }

        /**
         * Admin Scripts on pages the post-type RB_VIDEO_POST_TYPE
         */
        public function register_admin_scripts()
        {
            global $typenow;
            if ($typenow === RB_VIDEO_POST_TYPE) {
                wp_enqueue_style(
                    "rb-video-admin",
                    RB_VIDEO_URL . "/admin/css/admin.css"
                );
            }
        }
    }
}
