<?php

if (!class_exists("RB_Video_Post_Type")) {
    class RB_Video_Post_Type
    {
        public static function init()
        {
            $self = new self();

            add_action("init", [$self, "create_post_type"]);

            add_action("save_post", [$self, "save_post"], 10, 2);

            add_action(
                "manage_" . RB_VIDEO_POST_TYPE . "_posts_custom_column",
                [$self, "rb_video_custom_columns"],
                10,
                2
            );

            add_filter(
                "manage_" . RB_VIDEO_POST_TYPE . "_posts_columns",
                [$self, "rb_video_cpt_columns"]
            );
        }

        /**
         * Create post-type RB_VIDEO_POST_TYPE
         */
        public function create_post_type()
        {
            register_post_type(
                RB_VIDEO_POST_TYPE,
                [
                    "label"                 => esc_html__(
                        "RB Vidéos",
                        RB_TEXTDOMAIN
                    ),
                    "description"           => esc_html__(
                        "Vidéos",
                        RB_TEXTDOMAIN
                    ),
                    "labels"                => [
                        "menu_name"     => "RB Vidéos",
                        "name"          => esc_html__("Vidéos", RB_TEXTDOMAIN),
                        "singular_name" => esc_html__("Vidéo", RB_TEXTDOMAIN),
                    ],
                    "public"                => true,
                    "supports"              => [
                        "title", "thumbnail"
                    ],
                    "menu_position"         => 5,
                    "hierarchical"          => false,
                    "exclude_from_search"   => false,
                    "publicly_queryable"    => true,
                    "show_in_rest"          => true,
                    "menu_icon"             => "dashicons-video-alt3",
                    "register_meta_box_cb"  => [$this, "add_meta_boxes"],
                ]
            );
        }

        /**
         * Register the custom column RB_VIDEO_PROP_LINK_URL.
         *
         * @param array $columns Existing columns.
         * @return array Columns with custom column added.
         */
        public function rb_video_cpt_columns($columns)
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
                    RB_VIDEO_PROP_LINK_URL => __("Vidéo", RB_TEXTDOMAIN)
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
        public function rb_video_custom_columns($column, $post_id)
        {
            switch ($column) {
                case RB_VIDEO_PROP_LINK_URL:
                    echo esc_url(get_post_meta(
                        $post_id,
                        RB_VIDEO_PROP_LINK_URL,
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
                "rb_video_meta_box",
                esc_html__("Vidéo mise en avant", RB_TEXTDOMAIN),
                [$this, "add_inner_meta_boxes"],
                RB_VIDEO_POST_TYPE
            );
        }

        /**
         * Render Meta Box content.
         *
         * @param WP_Post|instance $post The current post object.
         */
        public function add_inner_meta_boxes($post)
        {
            require_once RB_VIDEO_PATH . "/admin/views/rb-video_metabox.php";
        }

        /**
         * save post meta-data RB_VIDEO_POST_TYPE
         *
         * @param WP_Post|int $post_id The current post ID.
         */
        public function save_post($post_id)
        {
            if (isset($_POST[RB_VIDEO_NONCE])) {
                if (!wp_verify_nonce(
                    $_POST[RB_VIDEO_NONCE],
                    RB_VIDEO_NONCE
                )) {
                    return;
                }
            }

            if (defined("DOING_AUTOSAVE") && DOING_AUTOSAVE) {
                return;
            }

            if (isset($_POST["post_type"]) && RB_VIDEO_POST_TYPE === $_POST["post_type"]) {
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
                    RB_VIDEO_PROP_LINK_URL,
                    true
                );
                $new_link_url = $_POST[RB_VIDEO_PROP_LINK_URL];

                if (!empty($new_link_url)) {
                    update_post_meta(
                        $post_id,
                        RB_VIDEO_PROP_LINK_URL,
                        esc_url_raw($new_link_url),
                        $old_link_url
                    );
                }
            }
        }
    }
}
