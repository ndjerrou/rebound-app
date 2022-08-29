<?php

if (!class_exists("RB_Want_To_Buy_Rest_Api")) {
    class RB_Want_To_Buy_Rest_Api
    {
        public static function init()
        {
            $self = new self();

            add_action("rest_api_init", [$self, "rb_register_routes"]);
        }

        public function rb_register_routes()
        {
            $register_route = "/want-to-buys";

            register_rest_route(
                RB_REST_NAMESPACE,
                $register_route,
                [
                    "methods"             => \WP_REST_Server::READABLE,
                    "callback"            => [$this, "rb_read_want_to_buy"],
                    "permission_callback" => "__return_true"
                ]
            );
        }

        public function rb_read_want_to_buy(\WP_REST_Request $request)
        {
            $post_status =  sanitize_title($request["post_status"]);

            $want_to_buys = rb_get_want_to_buys($post_status);

            $response = new WP_REST_Response($want_to_buys);

            return $response;
        }
    }
}
