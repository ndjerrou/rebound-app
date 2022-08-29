<?php

if (!class_exists("RB_Lookbook_Rest_Api")) {
    class RB_Lookbook_Rest_Api
    {
        public static function init()
        {
            $self = new self();

            add_action("rest_api_init", [$self, "rb_register_routes"]);
        }

        public function rb_register_routes()
        {
            $register_route = "/lookbooks";

            register_rest_route(
                RB_REST_NAMESPACE,
                $register_route,
                [
                    "methods"             => \WP_REST_Server::READABLE,
                    "callback"            => [$this, "rb_read_lookbooks"],
                    "permission_callback" => "__return_true"
                ]
            );
        }

        public function rb_read_lookbooks(\WP_REST_Request $request)
        {
            $post_status =  sanitize_title($request["post_status"]);

            $lookbooks = rb_get_lookbooks($post_status);

            $response = new WP_REST_Response($lookbooks);

            return $response;
        }
    }
}
