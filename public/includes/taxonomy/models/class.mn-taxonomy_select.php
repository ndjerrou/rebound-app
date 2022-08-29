<?php

if (!class_exists("RB_Taxonomy_Select")) {
    class RB_Taxonomy_Select
    {
        public string $taxonomy;

        public string $taxonomy_select;

        public string $meta_key = "mn_select";

        public string $meta_key_html;

        public string $field = "Titre";

        public string $text_domain = "";

        protected string $nonce;

        /**
         * Constructor.
         *
         * @param string $taxonomy
         * @param string $taxonomy_select
         * @param ?string $meta_key
         * @param ?string $field
         * @param ?string $text_domain
         */
        function __construct(
            string $taxonomy,
            string $taxonomy_select,
            ?string $meta_key,
            ?string $field,
            ?string $text_domain
        ) {
            $this->taxonomy = $taxonomy;

            $this->taxonomy_select = $taxonomy_select;

            if ($meta_key) $this->meta_key = $meta_key;

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
         * @param string $taxonomy_select
         * @param ?string $meta_key
         * @param ?string $field
         * @param ?string $text_domain
         * @param ?bool $display_column
         * @return void
         */
        static public function init(
            string $taxonomy,
            string $taxonomy_select,
            ?string $meta_key,
            ?string $field,
            ?string $text_domain,
            ?bool $display_column
        ): void {
            $self = new self(
                $taxonomy,
                $taxonomy_select,
                $meta_key,
                $field,
                $text_domain
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

            if ($display_column) {
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
        }

        /**
         * Add select field in taxonomy page.
         *
         * @param string $taxonomy
         * @return void
         */
        public function rb_add_custom_taxonomy(string $taxonomy): void
        {
            $field = 'select';

            require(__DIR__ . "/../views/mn-taxonomy_field_add.php");
        }

        /**
         * Save the taxonomy selected field.
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
                $category = esc_attr($_POST[$this->meta_key]);

                $category ?
                    add_term_meta($term_id, $this->meta_key, $category, true) :
                    add_term_meta($term_id, $this->meta_key, '', true);
            }
        }

        /**
         * Add the select field in edit form page.
         *
         * @param WP_Term $term
         * @param string $taxonomy
         * @return void
         */
        public function rb_update_custom_taxonomy(WP_Term $term, string $taxonomy): void
        {
            $field = 'select';

            require(__DIR__ . "/../views/mn-taxonomy_field_update.php");
        }

        /**
         * Update the taxonomy selected field.
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
                $category = esc_attr($_POST[$this->meta_key]);

                if ($category) update_term_meta($term_id, $this->meta_key, $category);
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
            $offset = 2;

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
        }

        /**
         * Admin Scripts on pages the taxonomy.
         *
         * @param ?string $columns
         * @param ?string $column
         * @param ?int $id
         * @return void
         */
        public function rb_display_custom_taxonomy_column_value(?string $columns, ?string $column, ?int $id): void
        {
            if ($column === $this->meta_key) {
                $columns = get_term_meta($id, $this->meta_key, true);

                echo $columns;
            }
        }
    }
}
