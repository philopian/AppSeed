import $ from 'jquery';

export default class ShowComponents {
  constructor() {
    $(document).on('click', '#show-hide-all-components', this.showHideAllComponents.bind(this));
    this.showComponents = this.showComponents.bind(this);
    this.hideComponents = this.hideComponents.bind(this);


  }



  showComponents() {
    console.log('[....SHOW]');
    // Add the red border
    $('.react-component').addClass('show-react-components');

    // only show the first card
    $("#container-cards div").hide()
    $("#container-cards div").first().show();

    // Hide the webpack logo
    $("#webpack-logo").hide();

    // Show the react component view title
    $("#show-react-component-title").show();
    $("#welcome-message").hide();
  }

  hideComponents() {
    console.log('[.....HIDE]');
    $('.react-component').removeClass('show-react-components');

    $("#container-cards div").show();

    // Show the webpack logo
    $("#webpack-logo").show();

    // Show the react component view title
    $("#show-react-component-title").hide();
    $("#welcome-message").show();
  }

  showHideAllComponents() {
    console.log('[show all components]');

    const showingReactComponents = $('.react-component').hasClass('show-react-components');
    if (showingReactComponents) {
      this.hideComponents();
    } else {
      this.showComponents();
    }
  }


}