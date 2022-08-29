<?php

?>
<div class="form-field term-group">
    <label for="<?= $this->meta_key; ?>"><?php _e($this->field, $this->text_domain); ?></label>
    <?php
    /**
     * Display Field
     */
    if (isset($field)) switch ($field) {
        case 'select':
            require(__DIR__ . "/mn-taxonomy_field_select.php");

            break;

        case 'image':
            require(__DIR__ . "/mn-taxonomy_field_image.php");

            break;

        default:
            break;
    }
    ?>
</div>
