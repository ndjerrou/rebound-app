<?php

$rb_woocommerce_tag = get_post_meta($post->ID, "rb_thumbnail_tag", true);
?>
<fieldset>
    <input type="hidden" name="<?= "rb_woocommerce_tag"; ?>" value="<?= wp_create_nonce("rb_woocommerce_tag"); ?>" />
    <div>
        <?php
        /**
         * Display gallery
         */
        ?>
        <div id="rb-woocommerce-tag">
            <?php
            if ($rb_woocommerce_tag) :
            ?>
                <img src="<?= wp_get_attachment_url(esc_attr($rb_woocommerce_tag)) ?>" alt="<?= "_thumbnail_tag" ?>" width="50" height="50">
            <?php
            endif;
            ?>
        </div>

        <?php
        /**
         * The actual field that will hold the URL for our file
         */
        ?>
        <input hidden class="large-text" name="<?= "rb_thumbnail_tag" ?>" id="rb-woocommerce-tag-media" value="<?php echo esc_attr($rb_woocommerce_tag); ?>"><br>

        <?php
        /**
         * The button that opens our media uploader
         * The `data-media-uploader-target` value should match the ID/unique selector of your field.
         * We"ll use this value to dynamically inject the file URL of our uploaded media asset into your field once successful (in the admin.js file)
         */
        ?>
        <button type="button" class="button rb-woocommerce-tag-upload-media" data-media-uploader-target="#rb-woocommerce-tag-media"><?php _e("Télécharger l'étiquette", RB_TEXTDOMAIN) ?></button>
        <button type="button" class="button rb-woocommerce-tag-reset-media" data-media-uploader-target="#rb-woocommerce-tag-media"><?php _e("Réinitialiser l'étiquette", RB_TEXTDOMAIN) ?></button>
    </div>
</fieldset>
