<?php
/**
 * Plugin runs only from wordpress
 */
defined( 'ABSPATH' ) || exit;

/**
 * Admin page build with Titan framework
 * @since 2.1.0
 */
require_once dirname(__FILE__) . '/../titan-framework/titan-framework-embedder.php';

add_action( 'tf_create_options', 'ymb_settings_page' );

/**
 * Creates plugin's settings page
 * @since 2.1.0
 */
if ( ! function_exists( 'ymb_settings_page' ) ) {
	function ymb_settings_page() {

			$titan = TitanFramework::getInstance( 'ymb_titan' );

			$settingsPanel = $titan->createAdminPanel( array(
			'id' 	 => 'yandex-money-button',
			'name' => 'Кнопка Яндекс Денег',
			'desc' => '',
			) );

		$generalTab = $settingsPanel->createTab( array(
			'name' => 'Настройки по умолчанию',
			'desc' => '<p>Эти настройки будут применены ко всем создаваемым вами кнопкам. Вы можете переопределить их для каждой конкретной кнопки в настройках блока или виджета.<br /><strong>Внимание</strong>, платежный шлюз настраивается отдельно, в разделе WooCommerce.</p>',
		) );
		

		$generalTab->createOption( array(
			'name' => 'Номер кошелька получателя по умолчанию',
			'id' => 'receiver',
			'type' => 'text',
		) );

		$generalTab->createOption( array(
			'name' => 'Сумма по умолчанию',
			'id' => 'sum',
			'type' => 'text',
		) );

		$generalTab->createOption( array(
			'name' => 'Назначение платежа по умолчанию',
			'id' => 'targets',
			'type' => 'text',
		) );

		$generalTab->createOption( array(
			'type' => 'Save',
			'save' => 'Сохранить',
			'use_reset' => false,
		) );

		$generalTab->createOption( array(
			'type' => 'custom',
			'custom' => 'Если вам понравился плагин, пожалуйста, <a target="_blank" href="https://wordpress.org/support/plugin/yandex-money-button/reviews/#new-post">оставьте отзыв на wordpress.org</a>',
		));

		if ( ymb_fs()->is_not_paying() ) {

			$generalTab->createOption( array(
			'type' => 'heading',
					'name'    => '<a href="' . ymb_fs()->get_upgrade_url() . '"><strong>Активируйте ПРО версию</strong></a> чтобы получить дополнительные настройки',
					'desc' => 'Настройка цвета кнопки, запрос на сбор дополнительной информации с плательщика (ФИО, телефон, почта, адрес), настройка адреса для перенаправления после совершения платежа, а так же автоматизация платежного шлюза Woocommerce.',

			) );

		}

	}
}
