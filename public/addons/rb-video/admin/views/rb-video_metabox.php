<?php
$link_url = get_post_meta($post->ID, RB_VIDEO_PROP_LINK_URL, true);
?>

<table class="form-table rb-video-metabox">
    <input type="hidden" name="<?= RB_VIDEO_NONCE; ?>" value="<?= wp_create_nonce(RB_VIDEO_NONCE); ?>" />
    <tr>
        <th>
            <label for="<?= RB_VIDEO_PROP_LINK_URL; ?>"><?php esc_html_e("Définir l'URL mise en avant", RB_TEXTDOMAIN); ?></label>
        </th>
        <td>
            <input type="url" name="<?= RB_VIDEO_PROP_LINK_URL; ?>" id="<?= RB_VIDEO_PROP_LINK_URL; ?>" class="regular-text" value="<?= isset($link_url) ? esc_url($link_url) : ""; ?>" required />
        </td>
    </tr>
</table>
