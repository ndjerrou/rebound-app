<?php

?>
<tr class="form-field term-group-wrap">
    <th scope="row">
        <label for="<?= $this->meta_key; ?>"><?php _e($this->field, $this->text_domain); ?></label>
    </th>
    <td>
        <fieldset>
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
        </fieldset>
    </td>
</tr>
