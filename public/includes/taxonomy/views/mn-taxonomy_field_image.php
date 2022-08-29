<?php

$taxonomy_meta_value = [];

if (isset($term)) $taxonomy_meta_value = get_term_meta($term->term_id, $this->meta_key, true);

$sanitize_taxonomy_meta_value = $taxonomy_meta_value && !empty($taxonomy_meta_value);

$gallery = $sanitize_taxonomy_meta_value ? implode(',', $taxonomy_meta_value) : '';

$multiple = $this->multiple ? 'mn-multiple' : '';

?>
<input hidden name="<?= $this->nonce; ?>" value="<?= wp_create_nonce($this->nonce); ?>" />
<?php
/**
 * Display gallery
 */
?>
<div class="mn-gallery <?= $multiple; ?>" id="<?= $this->meta_key_html; ?>">
    <?php
    if ($sanitize_taxonomy_meta_value) :
        foreach ($taxonomy_meta_value as $id) :
    ?>
            <img src="<?= wp_get_attachment_url(esc_attr($id)) ?>" alt="<?= $this->meta_key; ?>" width="50" height="50">
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
<input hidden class="large-text" name="<?= $this->meta_key; ?>" id="<?= $this->media; ?>" value="<?= esc_attr($gallery); ?>"><br>

<?php
/**
 * The button that opens our media uploader
 * The `data-media-uploader-target` value should match the ID/unique selector of your field.
 * We"ll use this value to dynamically inject the file URL of our uploaded media asset into your field once successful (in the admin.js file)
 */
?>
<button type="button" class="button <?= $this->media_upload; ?>" data-media-uploader-target="#<?= $this->media; ?>"><?php _e("Télécharger les médias", $this->text_domain) ?></button>
<button type="button" class="button <?= $this->media_reset; ?>" data-media-uploader-target="#<?= $this->media; ?>"><?php _e("Réinitialiser les médias", $this->text_domain) ?></button>
