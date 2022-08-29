<?php

$categories = rb_get_terms_taxonomy($this->taxonomy_select);

if (isset($term)) $taxonomy_meta_value = get_term_meta($term->term_id, $this->meta_key, true);

?>

<input hidden name="<?= $this->nonce; ?>" value="<?= wp_create_nonce($this->nonce); ?>" />
<?php
/**
 * Display select
 */
?>
<select name="<?= $this->meta_key; ?>">
    <?php
    if (isset($taxonomy_meta_value) && $taxonomy_meta_value) :
    ?>
        <option value=""><?= $taxonomy_meta_value; ?> (courante)</option>
    <?php
    endif;
    foreach ($categories as $category) :
    ?>
        <option value="<?= $category['slug']; ?>"><?= $category['slug']; ?></option>
    <?php
    endforeach
    ?>
</select>
