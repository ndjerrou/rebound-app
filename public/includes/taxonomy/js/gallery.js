(($) =>
  $(window).load(() => {
    /**
     * Load media uploader on pages with our custom metabox
     */
    $(meta_image.upload_media_class).click((e) => {
      // Instantiates the variable that holds the media library frame.
      let metaImageFrame;

      const btn = e.target;

      if (!btn || !$(btn).attr('data-media-uploader-target')) return;

      const field = $(btn).data('media-uploader-target');

      const images = $(btn).parent().children('.mn-gallery');

      e.preventDefault();

      const isMultiple = $(btn).parent().children('.mn-multiple');
      const multiple = isMultiple.length && 'add';

      // Sets up the media library frame
      metaImageFrame = wp.media.frames.metaImageFrame;
      metaImageFrame = wp.media({
        multiple,
        title: meta_image.title,
      });

      // Runs when an image is selected.
      metaImageFrame.on('select', () => {
        images.empty();
        // Grabs the attachment selection of the model.
        const media_attachment = metaImageFrame.state().get('selection');

        const ids = [];
        const urls = [];

        media_attachment.each((selection) => {
          ids.push(selection.attributes.id);
          urls.push(selection.attributes.url);
        });

        // Sends the attachment URL to our custom image input field.
        $(field).val(ids);

        urls.forEach((url) => {
          images.append(`<img src="${url}" width="50" height="50">`);
        });
      });

      // Opens the media library frame.
      metaImageFrame.open();
    });

    $(meta_image.reset_media_class).click((e) => {
      const btn = e.target;

      if (!btn || !$(btn).attr('data-media-uploader-target')) return;

      const field = $(btn).data('media-uploader-target');

      const images = $(btn).parent().children('.mn-gallery');

      $(field).val(String());
      images.empty();
    });
  }))(jQuery);
