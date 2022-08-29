<?php

if (!class_exists("RB_Notification_Post_Type")) {
    class RB_Notification_Post_Type
    {
        public static function init()
        {
            $self = new self();

            add_action("init", [$self, "create_post_type"]);

            add_action("save_post", [$self, "save_post"], 10, 2);

            add_action(
                "manage_" . RB_NOTIFICATION_POST_TYPE . "_posts_custom_column",
                [$self, "rb_notification_custom_columns"],
                10,
                2
            );

            add_filter(
                "manage_" . RB_NOTIFICATION_POST_TYPE . "_posts_columns",
                [$self, "rb_notification_cpt_columns"]
            );
        }

        /**
         * Create post-type RB_NOTIFICATION_POST_TYPE
         */
        public function create_post_type()
        {
            register_post_type(
                RB_NOTIFICATION_POST_TYPE,
                [
                    "label"                 => esc_html__(
                        "RB Notifications",
                        RB_TEXTDOMAIN
                    ),
                    "description"           => esc_html__(
                        "Notifications",
                        RB_TEXTDOMAIN
                    ),
                    "labels"                => [
                        "menu_name"     => "RB Notifications",
                        "name"          => esc_html__("Notifications", RB_TEXTDOMAIN),
                        "singular_name" => esc_html__("Notification", RB_TEXTDOMAIN),
                    ],
                    "public"                => true,
                    "supports"              => [
                        "title"
                    ],
                    "menu_position"         => 5,
                    "hierarchical"          => false,
                    "exclude_from_search"   => false,
                    "publicly_queryable"    => true,
                    "show_in_rest"          => true,
                    "menu_icon"             => "dashicons-email-alt2",
                    "register_meta_box_cb"  => [$this, "add_meta_boxes"],
                ]
            );
        }

        /**
         * Register the custom column RB_NOTIFICATION_PROP_EMAIL.
         *
         * @param array $columns Existing columns.
         * @return array Columns with custom column added.
         */
        public function rb_notification_cpt_columns($columns)
        {
            # Insert at offset 3
            $offset = 3;

            $new_columns =
                array_slice(
                    $columns,
                    0,
                    $offset,
                    true
                ) + [
                    RB_NOTIFICATION_PROP_EMAIL => __("Email du demandeur", RB_TEXTDOMAIN)
                ] + array_slice(
                    $columns,
                    $offset,
                    NULL,
                    true
                );

            return $new_columns;
        }

        /**
         * Fires in each custom column on the Posts list table.
         *
         * This hook only fires if the current post type is hierarchical,
         * such as pages.
         *
         * @param string $column The name of the column to display.
         * @param WP_Post|int $post_id The current post ID.
         */
        public function rb_notification_custom_columns($column, $post_id)
        {
            switch ($column) {
                case RB_NOTIFICATION_PROP_EMAIL:
                    echo esc_html(get_post_meta(
                        $post_id,
                        RB_NOTIFICATION_PROP_EMAIL,
                        true
                    ));

                    break;
            }
        }

        /**
         * Add meta boxes
         */
        public function add_meta_boxes()
        {
            add_meta_box(
                "rb_notification_meta_box",
                esc_html__("Email du demandeur", RB_TEXTDOMAIN),
                [$this, "add_inner_meta_boxes"],
                RB_NOTIFICATION_POST_TYPE
            );
        }

        /**
         * Render Meta Box content.
         *
         * @param WP_Post|instance $post The current post object.
         */
        public function add_inner_meta_boxes($post)
        {
            require_once RB_NOTIFICATION_PATH . "/admin/views/rb-notification_metabox.php";
        }

        /**
         * save post meta-data RB_NOTIFICATION_POST_TYPE
         *
         * @param WP_Post|int $post_id The current post ID.
         */
        public function save_post($post_id)
        {
            if (isset($_POST[RB_NOTIFICATION_NONCE])) {
                if (!wp_verify_nonce(
                    $_POST[RB_NOTIFICATION_NONCE],
                    RB_NOTIFICATION_NONCE
                )) {
                    return;
                }
            }

            if (defined("DOING_AUTOSAVE") && DOING_AUTOSAVE) {
                return;
            }

            if (isset($_POST["post_type"]) && RB_NOTIFICATION_POST_TYPE === $_POST["post_type"]) {
                if (!current_user_can("edit_page", $post_id)) {
                    return;
                }
            }
            if (!current_user_can("edit_post", $post_id)) {
                return;
            }

            if (isset($_POST["action"]) && "editpost" === $_POST["action"]) {
                $old_link_url = get_post_meta(
                    $post_id,
                    RB_NOTIFICATION_PROP_EMAIL,
                    true
                );
                $new_link_url = $_POST[RB_NOTIFICATION_PROP_EMAIL];

                if (!empty($new_link_url)) {
                    update_post_meta(
                        $post_id,
                        RB_NOTIFICATION_PROP_EMAIL,
                        esc_attr($new_link_url),
                        $old_link_url
                    );
                }
            }
        }
    }
}
