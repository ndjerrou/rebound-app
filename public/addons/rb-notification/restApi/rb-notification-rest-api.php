<?php

if (!class_exists("RB_Notification_Rest_Api")) {
    class RB_Notification_Rest_Api
    {
        public static function init()
        {
            $self = new self();

            add_action("rest_api_init", [$self, "rb_register_routes"]);
        }

        public function rb_register_routes()
        {
            $register_route = "/notifications";

            register_rest_route(
                RB_REST_NAMESPACE,
                $register_route,
                [
                    "methods"             => \WP_REST_Server::CREATABLE,
                    "callback"            => [$this, "rb_read_notification"],
                    "permission_callback" => [$this, "check_permissons"],
                ]
            );
        }

        public function check_permissons(\WP_REST_Request $request)
        {
            $oauth_consumer_key = "ck_6bd78135bda2d7a3114bf377b1704b31843faa42";

            $is_valid_oauth_key = $request->get_params()["oauth_consumer_key"] === $oauth_consumer_key;

            return $is_valid_oauth_key;
        }

        public function rb_read_notification(\WP_REST_Request $request)
        {
            $body = $request->get_params();

            $is_valid_notification = rb_check_notification($body["title"], $body["email"]);

            if (!$is_valid_notification) return new WP_Error(
                "rb_blocked_for_private_reason",
                __("Demande déjà enregistrée.", RB_TEXTDOMAIN),
                ["status" => 403]
            );

            $data = [
                "post_title"        => $body["title"],
                "post_type"         => RB_NOTIFICATION_POST_TYPE,
                "post_status"       => "publish",
            ];

            $notification_id = wp_insert_post($data, true);

            if ($notification_id instanceof \WP_Error) return $notification_id;

            update_post_meta(
                $notification_id,
                RB_NOTIFICATION_PROP_EMAIL,
                $body["email"]
            );

            $notification = rb_get_notifications("any", $notification_id);

            $response = new WP_REST_Response($notification);

            return $response;
        }
    }
}
