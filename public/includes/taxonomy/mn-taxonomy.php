<?php

if (!class_exists("MN_Taxonomy")) {
    class MN_Taxonomy
    {
        function __construct()
        {
            if (!defined("MN_TAXONOMY_URL")) define("MN_TAXONOMY_URL", RB_URL . "/includes/taxonomy");

            require(__DIR__ . "/models/class.mn-taxonomy_image.php");

            require(__DIR__ . "/models/class.mn-taxonomy_select.php");
        }

        /**
         * Register hooks for image field.
         *
         * @param string $taxonomy
         * @param ?string $meta_key
         * @param ?string $field
         * @param ?string $text_domain
         * @param ?bool $multiple
         * @param ?bool $display_column
         * @return void
         */
        public function mn_add_taxonomy_image(
            string  $taxonomy,
            ?string $meta_key = null,
            ?string $field = null,
            ?string $text_domain = null,
            ?bool $multiple = null,
            ?bool $display_column = null
        ): void {
            MN_Taxonomy_Image::init(
                $taxonomy,
                $meta_key,
                $field,
                $text_domain,
                $multiple,
                $display_column
            );
        }

        /**
         * Register hooks for select field.
         *
         * @param string $taxonomy
         * @param string $taxonomy_select
         * @param ?string $meta_key
         * @param ?string $field
         * @param ?string $text_domain
         * @param ?bool $display_column
         * @return void
         */
        public function mn_add_taxonomy_select(
            string $taxonomy,
            string $taxonomy_select,
            ?string $meta_key = null,
            ?string $field = null,
            ?string $text_domain = null,
            ?bool $display_column = null
        ): void {
            RB_Taxonomy_Select::init(
                $taxonomy,
                $taxonomy_select,
                $meta_key,
                $field,
                $text_domain,
                $display_column
            );
        }
    }
}
