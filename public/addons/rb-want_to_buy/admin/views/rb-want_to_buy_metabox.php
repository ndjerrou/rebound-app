<?php
$price = get_post_meta($post->ID, RB_WANT_TO_BUY_PROP_PRICE, true);
$price = (int) filter_var($price, FILTER_SANITIZE_NUMBER_INT);
?>

<table class="form-table rb-want-to-buy-metabox">
    <input type="hidden" name="<?= RB_WANT_TO_BUY_NONCE; ?>" value="<?= wp_create_nonce(RB_WANT_TO_BUY_NONCE); ?>" />
    <tr>
        <th>
            <label for="<?= RB_WANT_TO_BUY_PROP_PRICE; ?>"><?php esc_html_e("Définir le prix mise en avant", RB_TEXTDOMAIN); ?></label>
        </th>
        <td>
            <input type="number" name="<?= RB_WANT_TO_BUY_PROP_PRICE; ?>" id="<?= RB_WANT_TO_BUY_PROP_PRICE; ?>" class="regular-text" value="<?= isset($price) ? $price : ""; ?>" required />
            <label for="currency"><?= RB_WANT_TO_BUY_CURRENCY; ?></label>
        </td>
    </tr>
</table>
