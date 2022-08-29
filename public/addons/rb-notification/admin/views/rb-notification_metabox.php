<?php
$email = get_post_meta($post->ID, RB_NOTIFICATION_PROP_EMAIL, true);
?>

<table class="form-table rb-email-info-product-metabox">
    <input type="hidden" name="<?= RB_NOTIFICATION_NONCE; ?>" value="<?= wp_create_nonce(RB_NOTIFICATION_NONCE); ?>" />
    <tr>
        <th>
            <label for="<?= RB_NOTIFICATION_PROP_EMAIL; ?>"><?php esc_html_e("Définir l'émail du demandeur", RB_TEXTDOMAIN); ?></label>
        </th>
        <td>
            <input type="email" name="<?= RB_NOTIFICATION_PROP_EMAIL; ?>" id="<?= RB_NOTIFICATION_PROP_EMAIL; ?>" class="regular-text" value="<?= isset($email) ? $email : ""; ?>" required />
        </td>
    </tr>
</table>
