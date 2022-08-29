<?php

if (!class_exists("MN_Taxonomy_Image")) {
    class MN_Taxonomy_Image
    {
        public string $taxonomy;

        public string $meta_key = "mn_thumbnail_id";

        public string $meta_key_html;

        public bool $multiple = false;

        public bool $cover = false;

        public string $field = "Cover";

        public string $text_domain = "";

        protected string $media;

        protected string $media_upload;

        protected string $media_reset;

        protected string $nonce;

        /**
         * Constructor.
         *
         * @param string $taxonomy
         * @param ?string $meta_key
         * @param ?string $field
         * @param ?string $text_domain
         * @param ?bool $multiple
         */
        function __construct(
            string $taxonomy,
            ?string $meta_key,
            ?string $field,
            ?string $text_domain,
            ?bool  $multiple
        ) {
            $this->taxonomy = $taxonomy;

            if ($meta_key) {
                $this->meta_key = $meta_key;

                if (!$field) $field = "Gallerie";
            } else
                $this->cover = true;

            if ($multiple) $this->multiple = true;

            if ($field) $this->field = $field;

            if ($text_domain) $this->text_domain = $text_domain;

            $this->nonce = $this->meta_key . "_nonce";

            $this->meta_key_html = str_replace("_", "-", $this->meta_key);

            $this->media = "media-" . $this->meta_key_html;

            $this->media_upload = "mn-media-upload";

            $this->media_reset = "mn-media-reset";
        }

        /**
         * Init hooks.
         *
         * @param string $taxonomy
         * @param ?string $meta_key
         * @param ?string $field
         * @param ?string $text_domain
         * @param ?bool $multiple
         * @param ?bool $display_column
         * @return void
         */
        static public function init(
            string $taxonomy,
            ?string $meta_key,
            ?string $field,
            ?string $text_domain,
            ?bool $multiple,
            ?bool $display_column
        ): void {
            $self = new self(
                $taxonomy,
                $meta_key,
                $field,
                $text_domain,
                $multiple
            );

            add_action(
                "created_" . $self->taxonomy,
                [$self, "rb_save_custom_taxonomy"],
                10,
                2
            );

            add_action(
                $self->taxonomy . "_edit_form_fields",
                [$self, "rb_update_custom_taxonomy"],
                10,
                2
            );

            add_action(
                "edited_" . $self->taxonomy,
                [$self, "rb_updated_custom_taxonomy"],
                10,
                2
            );

            add_action(
                $self->taxonomy . "_add_form_fields",
                [$self, "rb_add_custom_taxonomy"],
                10,
                2
            );

            if ($display_column || $self->cover) {
                add_filter(
                    "manage_edit-" . $self->taxonomy . "_columns",
                    [$self, "rb_display_custom_taxonomy_column_heading"]
                );

                add_action(
                    "manage_" . $self->taxonomy . "_custom_column",
                    [$self, "rb_display_custom_taxonomy_column_value"],
                    10,
                    3
                );
            }

            add_action(
                "admin_enqueue_scripts",
                [$self, "register_admin_scripts"],
                999
            );
        }

        /**
         * Add image field in taxonomy page.
         *
         * @param string $taxonomy
         * @return void
         */
        public function rb_add_custom_taxonomy(string $taxonomy): void
        {
            $field = 'image';

            require(__DIR__ . "/../views/mn-taxonomy_field_add.php");
        }

        /**
         * Save the taxonomy image field.
         *
         * @param int $term_id
         * @param int $tt_id
         * @return void
         */
        public function rb_save_custom_taxonomy(int $term_id, int $tt_id): void
        {
            if (isset($_POST[$this->nonce])) {
                if (!wp_verify_nonce(
                    $_POST[$this->nonce],
                    $this->nonce
                )) {
                    return;
                }
            }

            if (defined("DOING_AUTOSAVE") && DOING_AUTOSAVE) {
                return;
            }

            if (
                isset($_POST["taxonomy"])
                && $this->taxonomy === $_POST["taxonomy"]
            ) {
                if (!current_user_can("manage_options", $term_id)) {
                    return;
                }
            }

            if (isset($_POST[$this->meta_key])) {
                $gallery = esc_attr($_POST[$this->meta_key]);

                $new_gallery = explode(
                    ",",
                    $gallery
                );

                !empty($gallery) ?
                    add_term_meta($term_id, $this->meta_key, $new_gallery, true) :
                    add_term_meta($term_id, $this->meta_key, [], true);
            }
        }

        /**
         * Add the image field in edit form page.
         *
         * @param WP_Term $term
         * @param string $taxonomy
         * @return void
         */
        public function rb_update_custom_taxonomy(WP_Term $term, string $taxonomy): void
        {
            $field = 'image';

            require(__DIR__ . "/../views/mn-taxonomy_field_update.php");
        }

        /**
         * Update the taxonomy image field.
         *
         * @param int $term_id
         * @param int $tt_id
         * @return void
         */
        public function rb_updated_custom_taxonomy(int $term_id, int $tt_id): void
        {
            if (isset($_POST[$this->nonce])) {
                if (!wp_verify_nonce(
                    $_POST[$this->nonce],
                    $this->nonce
                )) {
                    return;
                }
            }

            if (defined("DOING_AUTOSAVE") && DOING_AUTOSAVE) {
                return;
            }

            if (
                isset($_POST["taxonomy"])
                && $this->taxonomy === $_POST["taxonomy"]
            ) {
                if (!current_user_can("manage_options", $term_id)) {
                    return;
                }
            }

            if (isset($_POST[$this->meta_key])) {
                $gallery = esc_attr($_POST[$this->meta_key]);

                $new_gallery = explode(
                    ",",
                    $gallery
                );

                !empty($new_gallery) ?
                    update_term_meta($term_id, $this->meta_key, $new_gallery) :
                    update_term_meta($term_id, $this->meta_key, []);
            }
        }

        /**
         * Add new column heading.
         *
         * @param string[] $columns
         * @return string[]
         */
        public function rb_display_custom_taxonomy_column_heading(array $columns): array
        {
            if ($this->cover) {
                $offset = 1;

                $new_columns =
                    array_slice(
                        $columns,
                        0,
                        $offset,
                        true
                    ) + [
                        $this->meta_key => __($this->field, $this->text_domain)
                    ] + array_slice(
                        $columns,
                        $offset,
                        NULL,
                        true
                    );

                return $new_columns;
            } else {
                $columns[$this->meta_key] = __($this->field, $this->text_domain);

                return $columns;
            }
        }

        /**
         * Admin Scripts on pages the taxonomy.
         *
         * @param ?string $columns
         * @param ?string $column
         * @param ?WP_Post|integer  $id
         * @return void
         */
        public function rb_display_custom_taxonomy_column_value(?string $columns, ?string $column, ?int  $id): void
        {
            if ($column === $this->meta_key) {
                $taxonomy_meta_value = get_term_meta($id, $this->meta_key, true);

                $sanitize_taxonomy_meta_value = $taxonomy_meta_value && !empty($taxonomy_meta_value);

                $image_size = $this->multiple ? ['10', '10'] : ['50', '50'];

                if ($sanitize_taxonomy_meta_value) {
                    foreach ($taxonomy_meta_value as $id) {
                        $columns .= wp_get_attachment_image(esc_attr($id), $image_size);
                    }
                }

                echo $columns;
            }
        }

        /**
         * Admin Scripts on pages the taxonomy.
         *
         * @return void
         */
        public function register_admin_scripts(): void
        {
            global $taxnow;

            if ($this->taxonomy === $taxnow) {
                wp_enqueue_media();

                $script = "meta-box-image";

                wp_register_script(
                    $script,
                    MN_TAXONOMY_URL . "/js/gallery.js",
                    ["jquery"]
                );

                wp_localize_script(
                    $script,
                    "meta_image",
                    [
                        "title" => __("Gallerie images", $this->text_domain),
                        "upload_media_class" => "." . $this->media_upload,
                        "reset_media_class" => "." . $this->media_reset,
                    ]
                );

                wp_enqueue_script($script);
            }
        }
    }
}
