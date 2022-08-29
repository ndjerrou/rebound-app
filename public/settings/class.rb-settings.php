<?php

if (!class_exists('RB_Settings')) {
    class RB_Settings
    {
        public static $options;

        public static function init()
        {
            self::$options = get_option('rb_options');

            add_action('admin_menu', [self::class, 'add_menu']);

            add_action('admin_init', [self::class, 'admin_init']);
        }

        public static function add_menu()
        {
            /*
             *  Il est possible de positioner le menu comme sous-menu de
             *  plugins, apparence et settings avec la fonction
             *  add_(plugins, theme, options)_page et en retirant l"option icone
             */
            add_menu_page(
                esc_html__('Rebound Options', RB_TEXTDOMAIN),
                'RB Réglages',
                'manage_options',
                'rb_options',
                [self::class, 'rb_settings_page'], // * La vue
                'dashicons-dashboard',
                80
            );
        }

        public static function rb_settings_page()
        {
            if (!current_user_can('manage_options')) {
                return;
            }

            if (isset($_GET['settings-updated'])) {
                add_settings_error(
                    'rb_options',
                    'rb_message',
                    esc_html__('Settings Saved', RB_TEXTDOMAIN),
                    'success'
                );
            }

            settings_errors('rb_options');

            require(RB_PATH . '/settings/views/settings-page.php');
        }

        public static function admin_init()
        {
            register_setting('rb_group', 'rb_options', [self::class, 'rb_validate']);

            add_settings_section(
                'rb_main_section',
                esc_html__('Identification Paypal', RB_TEXTDOMAIN),
                null,
                'rb_page1'
            );

            add_settings_section(
                'rb_second_section',
                esc_html__('Lien des Réseaux Sociaux', RB_TEXTDOMAIN),
                null,
                'rb_page2'
            );

            add_settings_field(
                'rb_paypal_client_id',
                esc_html__('Client ID', RB_TEXTDOMAIN),
                [self::class, 'rb_paypal_client_id_callback'],
                'rb_page1',
                'rb_main_section'
            );

            add_settings_field(
                'rb_instagram',
                esc_html__('Instagram', RB_TEXTDOMAIN),
                [self::class, 'rb_instagram_callback'],
                'rb_page2',
                'rb_second_section',
                [
                    'label_for' => 'rb_instagram',
                ]
            );

            add_settings_field(
                'rb_youtube',
                esc_html__('YouTube', RB_TEXTDOMAIN),
                [self::class, 'rb_youtube_callback'],
                'rb_page2',
                'rb_second_section',
                [
                    'label_for' => 'rb_youtube',
                ]
            );

            add_settings_field(
                'rb_twitch',
                esc_html__('Twitch', RB_TEXTDOMAIN),
                [self::class, 'rb_twitch_callback'],
                'rb_page2',
                'rb_second_section',
                [
                    'label_for' => 'rb_twitch',
                ]
            );

            add_settings_field(
                'rb_tiktok',
                esc_html__('Tik Tok', RB_TEXTDOMAIN),
                [self::class, 'rb_tiktok_callback'],
                'rb_page2',
                'rb_second_section',
                [
                    'label_for' => 'rb_tiktok',
                ]
            );

            add_settings_field(
                'rb_discord',
                esc_html__('Discord', RB_TEXTDOMAIN),
                [self::class, 'rb_discord_callback'],
                'rb_page2',
                'rb_second_section',
                [
                    'label_for' => 'rb_discord',
                ]
            );

            add_settings_field(
                'rb_mail',
                esc_html__('Mail', RB_TEXTDOMAIN),
                [self::class, 'rb_mail_callback'],
                'rb_page2',
                'rb_second_section',
                [
                    'label_for' => 'rb_mail',
                ]
            );
        }

        public static function rb_paypal_client_id_callback()
        {
?>
            <textarea required type="area" name="rb_options[rb_paypal_client_id]" id="rb-paypal-client-id" cols="50" rows="3">
                <?php echo isset(self::$options['rb_paypal_client_id']) ?
                    esc_attr(self::$options['rb_paypal_client_id']) :
                    ''; ?>
            </textarea>
        <?php
        }

        public static function rb_instagram_callback($args)
        {
        ?>
            <input required type="url" name="rb_options[rb_instagram]" id="rb-instagram" value="<?php echo isset(self::$options['rb_instagram']) ?
                                                                                                    esc_attr(self::$options['rb_instagram']) :
                                                                                                    ''; ?>">
        <?php
        }

        public static function rb_youtube_callback($args)
        {
        ?>
            <input required type="url" name="rb_options[rb_youtube]" id="rb-youtube" value="<?php echo isset(self::$options['rb_youtube']) ?
                                                                                                esc_attr(self::$options['rb_youtube']) :
                                                                                                ''; ?>">
        <?php
        }

        public static function rb_twitch_callback($args)
        {
        ?>
            <input required type="url" name="rb_options[rb_twitch]" id="rb-twitch" value="<?php echo isset(self::$options['rb_twitch']) ?
                                                                                                esc_attr(self::$options['rb_twitch']) :
                                                                                                ''; ?>">
        <?php
        }

        public static function rb_tiktok_callback($args)
        {
        ?>
            <input required type="url" name="rb_options[rb_tiktok]" id="rb-tiktok" value="<?php echo isset(self::$options['rb_tiktok']) ?
                                                                                                esc_attr(self::$options['rb_tiktok']) :
                                                                                                ''; ?>">
        <?php
        }

        public static function rb_discord_callback($args)
        {
        ?>
            <input required type="url" name="rb_options[rb_discord]" id="rb_instagram" value="<?php echo isset(self::$options['rb_discord']) ?
                                                                                                    esc_attr(self::$options['rb_discord']) :
                                                                                                    ''; ?>">
        <?php
        }

        public static function rb_mail_callback($args)
        {
        ?>
            <input required type="email" name="rb_options[rb_mail]" id="rb-mail" value="<?php echo isset(self::$options['rb_mail']) ?
                                                                                            esc_attr(self::$options['rb_mail']) :
                                                                                            ''; ?>">
<?php
        }

        public static function rb_validate($input)
        {
            $new_input = [];

            foreach ($input as $key => $value) {
                switch ($key) {
                    case 'rb_paypal_client_id':
                        if (empty($value)) {
                            add_settings_error(
                                'rb_options',
                                'rb_message',
                                esc_html__('Client ID ne peut être vide', RB_TEXTDOMAIN),
                                'error'
                            );
                            $value = esc_html__('Merci de remplir ce champs', RB_TEXTDOMAIN);
                        }
                        $new_input[$key] = sanitize_text_field($value);

                        break;

                    case 'rb_instagram':
                        if (empty($value)) {
                            add_settings_error(
                                'rb_options',
                                'rb_message',
                                esc_html__('Instagram ne peut être vide', RB_TEXTDOMAIN),
                                'error'
                            );
                            $value = esc_html__('Merci de remplir ce champs', RB_TEXTDOMAIN);
                        }
                        $new_input[$key] = esc_url_raw($value);

                        break;

                    case 'rb_youtube':
                        if (empty($value)) {
                            add_settings_error(
                                'rb_options',
                                'rb_message',
                                esc_html__('YouyTube ne peut être vide', RB_TEXTDOMAIN),
                                'error'
                            );
                            $value = esc_html__('Merci de remplir ce champs', RB_TEXTDOMAIN);
                        }
                        $new_input[$key] = esc_url_raw($value);

                        break;

                    case 'rb_twitch':
                        if (empty($value)) {
                            add_settings_error(
                                'rb_options',
                                'rb_message',
                                esc_html__('Twitch ne peut être vide', RB_TEXTDOMAIN),
                                'error'
                            );
                            $value = esc_html__('Merci de remplir ce champs', RB_TEXTDOMAIN);
                        }
                        $new_input[$key] = esc_url_raw($value);

                        break;

                    case 'rb_tiktok':
                        if (empty($value)) {
                            add_settings_error(
                                'rb_options',
                                'rb_message',
                                esc_html__('Tik Tok ne peut être vide', RB_TEXTDOMAIN),
                                'error'
                            );
                            $value = esc_html__('Merci de remplir ce champs', RB_TEXTDOMAIN);
                        }
                        $new_input[$key] = esc_url_raw($value);

                        break;

                    case 'rb_discord':
                        if (empty($value)) {
                            add_settings_error(
                                'rb_options',
                                'rb_message',
                                esc_html__('Discord ne peut être vide', RB_TEXTDOMAIN),
                                'error'
                            );
                            $value = esc_html__('Merci de remplir ce champs', RB_TEXTDOMAIN);
                        }
                        $new_input[$key] = esc_url_raw($value);

                        break;

                    case 'rb_mail':
                        if (empty($value)) {
                            add_settings_error(
                                'rb_options',
                                'rb_message',
                                esc_html__('Mail ne peut être vide', RB_TEXTDOMAIN),
                                'error'
                            );
                            $value = esc_html__('Merci de remplir ce champs', RB_TEXTDOMAIN);
                        }
                        $new_input[$key] = sanitize_email($value);

                        break;

                    default:
                        $new_input[$key] = sanitize_text_field($value);

                        break;
                }
            }

            $new_input += self::$options;

            return $new_input;
        }
    }
}
