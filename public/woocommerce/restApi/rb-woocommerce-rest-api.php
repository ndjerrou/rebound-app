<?php

if (!class_exists("RB_Woo_Commerce_Rest_Api")) {
    class RB_Woo_Commerce_Rest_Api
    {
        public static function init()
        {
            $self = new self();

            add_action("rest_api_init", [$self, "rb_register_routes"]);
        }

        public function rb_register_routes()
        {
            $register_route = "/products";

            register_rest_route(
                RB_REST_NAMESPACE,
                $register_route,
                [
                    "methods"             => \WP_REST_Server::READABLE,
                    "callback"            => [$this, "rb_read_products"],
                    "permission_callback" => "__return_true"
                ]
            );
        }

        public function rb_read_products(\WP_REST_Request $request)
        {
            $post_status =  sanitize_title($request["post_status"]);

            $args = [
                "post_type"         => "product",
                "post_status"       => $post_status,
                "posts_per_page"    => -1
            ];

            $products = rb_get_products($post_status);

            $response = new WP_REST_Response($products);

            return $response;
        }
    }
}
