<?php
$TEMPLATE_PATH = parse_url(get_template_directory_uri(), PHP_URL_PATH);

$terms = [
  "paCondition"     => rb_get_terms_taxonomy("pa_condition"),
  "paRarity"       => rb_get_terms_taxonomy("pa_rarete"),
  "paSize"        => rb_get_terms_taxonomy("pa_taille"),
  "paSingleStitch"  => rb_get_terms_taxonomy("pa_single-stitch"),
  "paTheme"         => rb_get_terms_taxonomy("pa_theme"),
  "paColor"     => rb_get_terms_taxonomy("pa_couleur"),
  "productCat"     => rb_get_terms_taxonomy("product_cat"),
  "productPeriod"     => rb_get_terms_taxonomy("rb_periode"),
];

$social_networks = [
  "instagram"   => get_option('rb_options')["rb_instagram"],
  " youTube"    => get_option('rb_options')["rb_youtube"],
  "twitch"      => get_option('rb_options')["rb_twitch"],
  "tikTok"      => get_option('rb_options')["rb_tiktok"],
  "discord"     => get_option('rb_options')["rb_discord"],
  "mail"        => get_option('rb_options')["rb_mail"],
];

$pay_pal_client_id = get_option('rb_options')["rb_paypal_client_id"];

$rb_data = [
  "lookbooks"   => rb_get_lookbooks("publish"),
  "videos"      => rb_get_videos("publish"),
  "wantToBuys"  => rb_get_want_to_buys("publish"),
  "products"    => [
    "items"     => rb_get_products("publish"),
    "terms"     => $terms,
  ],
  "socialNetworks" => $social_networks,
  "payPalClientId" => $pay_pal_client_id
];

$user = wp_get_current_user();

$is_admin = user_can($user->ID, "administrator");

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="shortcut icon" href="%PUBLIC_URL%/assets/images/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-wptheme" />
  <link rel="apple-touch-icon" href="<?php echo $TEMPLATE_PATH; ?>/assets/images/logo192.png" />
  <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
  <link rel="manifest" href="<?php echo $TEMPLATE_PATH; ?>/manifest.json" />
  <!--
        If you're reading this from "view source" in your browser, it might not make sense as
        these tokens have already been evaluated and replaced, even in this remark blurb.

        Notice the use of "php echo $TEMPLATE_PATH;" and %PUBLIC_URL% in the tags above.
        Both will be replaced with the URL of the `public` folder during the build (%PUBLIC_URL%) or
        at render time (php echo $TEMPLATE_PATH;)
        Only files inside the `public` folder can be referenced like this.

        Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
        work correctly both with client-side routing and a non-root public URL.
        Learn how to configure a non-root public URL by running `npm run wpbuild`.
    -->
  <title>Rebound</title>
</head>

<body>
  <?php get_footer(); ?>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="app-root"></div>
  <script>
    const rbData = <?= json_encode($rb_data) ?>;
    const isAdmin = <?= json_encode($is_admin) ?>;
  </script>
  <!--
        This PHP file is a template.
        If you open it directly in the browser, you will see an empty page.

        You can add webfonts, meta tags, or analytics to this file.
        The build step will place the bundled scripts into the <body> tag.

        To begin the development, run `npm run wpstart` or `yarn wpstart`.
        To create a production bundle, use `npm run wpbuild` or `yarn wpbuild`.
    -->
</body>

</html>
