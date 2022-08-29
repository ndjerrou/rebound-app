<?php

if (!class_exists("RB_Lookbook_Post_Type")) {
    class RB_Lookbook_Post_Type
    {
        public static function init()
        {
            $self = new self();

            add_action("save_post", [$self, "rb_save_post"], 10, 2);

            add_action("add_meta_boxes", [$self, "rb_add_meta_boxes"]);

            add_action("admin_menu", [$self, "rb_remove_admin_menu"]);

            $custom_taxonomy = new MN_Taxonomy;

            $custom_taxonomy->mn_add_taxonomy_image(
                "post_tag",
                null,
                null,
                RB_TEXTDOMAIN,
            );
        }

        /**
         * Add meta boxes
         */
        public function rb_add_meta_boxes()
        {
            add_meta_box(
                "multi_image_upload_meta_box",
                __("Gallery LookBook", RB_TEXTDOMAIN),
                [$this, "multi_image_upload_meta_box"],
                RB_LOOKBOOK_POST_TYPE
            );
        }

        public function rb_remove_admin_menu()
        {
            remove_submenu_page("edit.php", "edit-tags.php?taxonomy=category");
        }

        /**
         * Render Meta Box content.
         *
         * @param WP_Post|instance $post The current post object.
         */
        public function multi_image_upload_meta_box($post)
        {
            require_once RB_LOOKBOOK_PATH . "/admin/views/rb-lookbook_gallery_metabox.php";
        }

        /**
         * save post meta-data RB_LOOKBOOK_POST_TYPE
         *
         * @param WP_Post|int $post_id The current post ID.
         */
        public function rb_save_post($post_id)
        {
            if (isset($_POST[RB_LOOKBOOK_GALLERY_NONCE])) {
                if (!wp_verify_nonce(
                    $_POST[RB_LOOKBOOK_GALLERY_NONCE],
                    RB_LOOKBOOK_GALLERY_NONCE
                )) {
                    return;
                }
            }

            if (defined("DOING_AUTOSAVE") && DOING_AUTOSAVE) {
                return;
            }

            if (
                isset($_POST["post_type"]) &&
                RB_LOOKBOOK_POST_TYPE === $_POST["post_type"]
            ) {
                if (!current_user_can("edit_page", $post_id)) {
                    return;
                }
            }
            if (!current_user_can("edit_post", $post_id)) {
                return;
            }

            if (isset($_POST["action"]) && "editpost" === $_POST["action"]) {
                $old_gallery = get_post_meta(
                    $post_id,
                    RB_LOOKBOOK_PROP_GALLERY,
                    true
                );
                $gallery = esc_attr($_POST[RB_LOOKBOOK_PROP_GALLERY]);
                $new_gallery = explode(
                    ",",
                    $gallery
                );

                !empty($gallery) ?
                    update_post_meta(
                        $post_id,
                        RB_LOOKBOOK_PROP_GALLERY,
                        $new_gallery,
                        $old_gallery
                    ) :
                    update_post_meta(
                        $post_id,
                        RB_LOOKBOOK_PROP_GALLERY,
                        [],
                        $old_gallery
                    );
            }
        }
    }
}
