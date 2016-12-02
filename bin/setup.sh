echo "You will use SASS as CSS extension language 😉 . Do you wish to use CSSNEXT 😀 ?";
echo "This choice is irreversible. Obviously you can install the project again or just use your version control system to discard changes in working directory";

select yn in "Yes" "No" "Cancel"; do
  case $yn in
    Yes )
      echo "All SASS (styles, config) files are going to be deleted";

      rm -rf webpack-assets.json postcss.config.js webpack/dev.config.js webpack/isomorphic.tools.config.js src/common/layouts/AppLayout/index.js src/common/styles src/common/views/AboutView/AboutView.jsx
      mv postcss.config.cssnext.js postcss.config.js
      mv webpack/dev.config.cssnext.js webpack/dev.config.js
      mv webpack/isomorphic.tools.config.cssnext.js webpack/isomorphic.tools.config.js
      mv src/common/layouts/AppLayout/index.cssnext.js src/common/layouts/AppLayout/index.js
      mv src/common/styles.cssnext src/common/styles
      mv src/common/views/AboutView/AboutView.cssnext.jsx src/common/views/AboutView/AboutView.jsx
      mv src/common/views/AboutView/AboutView.scss src/common/views/AboutView/AboutView.css

      echo "This setup (bin/setup.sh) will self-destruct 💥 .";

      rm -rf bin/setup.sh

      echo "Congratulations you are going to use CSSNEXT 👏 .";

      break;;

    No )
      echo "All CSSNEXT (styles, config) files are going to be deleted";

      rm -rf webpack-assets.json postcss.config.cssnext.js webpack/dev.config.cssnext.js webpack/isomorphic.tools.config.cssnext.js src/common/layouts/AppLayout/index.cssnext.js src/common/styles.cssnext src/common/views/AboutView/AboutView.cssnext.jsx

      echo "This setup (bin/setup.sh) will self-destruct 💥 .";

      rm -rf bin/setup.sh

      echo "Congratulations you are going to use SASS 👏 .";

      break;;

    Cancel ) exit;;
  esac
done
