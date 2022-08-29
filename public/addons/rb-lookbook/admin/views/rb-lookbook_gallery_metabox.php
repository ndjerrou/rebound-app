<?php
$rb_lookbook_gallery = get_post_meta($post->ID, RB_LOOKBOOK_PROP_GALLERY, true) ?: [];
$gallery = implode(',', $rb_lookbook_gallery);
?>
<fieldset>
    <input type="hidden" name="<?= RB_LOOKBOOK_GALLERY_NONCE; ?>" value="<?= wp_create_nonce(RB_LOOKBOOK_GALLERY_NONCE); ?>" />
    <div>
        <?php
        /**
         * Display gallery
         */
        ?>
        <div id="rb-gallery">
            <?php
            if (isset($rb_lookbook_gallery) && $gallery) :
                foreach ($rb_lookbook_gallery as $id) :
            ?>
                    <img src="<?= wp_get_attachment_url(esc_attr($id)) ?>" alt="<?= RB_LOOKBOOK_PROP_GALLERY ?>" width="50" height="50">
            <?php
                endforeach;
            endif;
            ?>
        </div>

        <?php
        /**
         * The actual field that will hold the URL for our file
         */
        ?>
        <input hidden class="large-text" name="<?= RB_LOOKBOOK_PROP_GALLERY ?>" id="rb-lookbook-media" value="<?php echo esc_attr($gallery); ?>"><br>

        <?php
        /**
         * The button that opens our media uploader
         * The `data-media-uploader-target` value should match the ID/unique selector of your field.
         * We"ll use this value to dynamically inject the file URL of our uploaded media asset into your field once successful (in the admin.js file)
         */
        ?>
        <button type="button" class="button" id="rb-lookbook-upload-media" data-media-uploader-target="#rb-lookbook-media"><?php _e("Télécharger les médias", RB_TEXTDOMAIN) ?></button>
        <button type="button" class="button" id="rb-lookbook-reset-media" data-media-uploader-target="#rb-lookbook-media"><?php _e("Réinitialiser les médias", RB_TEXTDOMAIN) ?></button>
    </div>
</fieldset>
