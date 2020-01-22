<?php

/**
 * Plugin runs only from wordpress
 */
defined( 'ABSPATH' ) || exit;
/**
 * Yandex Money Button Widget
 * @since 2.2.0
 */
class Ymb_button extends WP_Widget
{
    /**
     * Sets up the widgets name etc
     */
    public function __construct()
    {
        $widget_ops = array(
            'classname'   => 'ymb-widget',
            'description' => 'Кнопка Яндекс Денег',
        );
        parent::__construct( 'ymb_button', 'Кнопка Яндекс Денег', $widget_ops );
    }
    
    /**
     * Outputs the content of the widget
     * @param array $args
     * @param array $instance
     */
    public function widget( $args, $instance )
    {
        include dirname( __FILE__ ) . '/ymb-icons.php';
        echo  '<div class="widget wp-block-ymb-button"><form method="POST" action="https://money.yandex.ru/quickpay/confirm.xml" target="_blank">' ;
        echo  '<input type="hidden" name="receiver" value="' . $instance['receiver'] . '">' ;
        echo  '<input type="hidden" name="quickpay-form" value="small">' ;
        echo  '<input type="hidden" name="targets" value="' . $instance['targets'] . '">' ;
        echo  '<input type="hidden" name="sum" value="' . $instance['sum'] . '">' ;
        echo  '<input type="hidden" name="paymentType" value="' . $instance['paymenttype'] . '">' ;
        echo  '<button type="submit" style="background: #ffdb4d; background-color: #ffdb4d; color: #ffffff;">' ;
        echo  '<div class="wp-block-ymb-button-div">' ;
        echo  $ymbIcons[$instance['paymenttype']] ;
        echo  '</div>' ;
        echo  '<span class="wp-block-ymb-button-span" style="color: #000;">' . (( '' != $instance['content'] ? $instance['content'] : 'Перевести' )) . '</span>' ;
        echo  '</button>' ;
        echo  '</form></div>' ;
    }
    
    /**
     * Outputs the options form on admin
     * @param array $instance The widget options
     */
    public function form( $instance )
    {
        /**
         * Prepare plugin options
         * @since 2.2.0
         */
        $titan = TitanFramework::getInstance( 'ymb_titan' );
        $ymb_options = array(
            'receiver' => $titan->getOption( 'receiver' ),
            'sum'      => $titan->getOption( 'sum' ),
            'targets'  => $titan->getOption( 'targets' ),
        );
        $receiver = ( !empty($instance['receiver']) ? $instance['receiver'] : $ymb_options['receiver'] );
        ?>
		<p>
		<label for="<?php 
        echo  esc_attr( $this->get_field_id( 'receiver' ) ) ;
        ?>"><?php 
        echo  'Номер счета Яндекс Денег на который вы хотите принимать переводы' ;
        ?></label> 
		<input class="widefat" id="<?php 
        echo  esc_attr( $this->get_field_id( 'receiver' ) ) ;
        ?>" name="<?php 
        echo  esc_attr( $this->get_field_name( 'receiver' ) ) ;
        ?>" type="text" value="<?php 
        echo  esc_attr( $receiver ) ;
        ?>" placeholder="41001xxxxxxxxxxxx">
		</p>
		<?php 
        $targets = ( !empty($instance['targets']) ? $instance['targets'] : $ymb_options['targets'] );
        ?>
		<p>
		<label for="<?php 
        echo  esc_attr( $this->get_field_id( 'targets' ) ) ;
        ?>"><?php 
        echo  'Назначение платежа' ;
        ?></label> 
		<input class="widefat" id="<?php 
        echo  esc_attr( $this->get_field_id( 'targets' ) ) ;
        ?>" name="<?php 
        echo  esc_attr( $this->get_field_name( 'targets' ) ) ;
        ?>" type="text" value="<?php 
        echo  esc_attr( $targets ) ;
        ?>" placeholder="На реактор холодного ядерного синтеза">
		</p>
		<?php 
        $sum = ( !empty($instance['sum']) ? $instance['sum'] : $ymb_options['sum'] );
        ?>
		<p>
		<label for="<?php 
        echo  esc_attr( $this->get_field_id( 'sum' ) ) ;
        ?>"><?php 
        echo  'Сумма платежа в рублях' ;
        ?></label> 
		<input class="widefat" id="<?php 
        echo  esc_attr( $this->get_field_id( 'sum' ) ) ;
        ?>" name="<?php 
        echo  esc_attr( $this->get_field_name( 'sum' ) ) ;
        ?>" type="text" value="<?php 
        echo  esc_attr( $sum ) ;
        ?>" placeholder="100">
		</p>
		<?php 
        $paymenttype = ( !empty($instance['paymenttype']) ? $instance['paymenttype'] : '' );
        ?>
		<p>
		<label for="<?php 
        echo  esc_attr( $this->get_field_id( 'paymenttype' ) ) ;
        ?>"><?php 
        echo  'Способ оплаты' ;
        ?></label> 
		<select class="widefat" id="<?php 
        echo  esc_attr( $this->get_field_id( 'paymenttype' ) ) ;
        ?>" name="<?php 
        echo  esc_attr( $this->get_field_name( 'paymenttype' ) ) ;
        ?>">
			<option value="PC" <?php 
        echo  ( 'PC' == $paymenttype ? 'selected' : '' ) ;
        ?>>Оплата из кошелька в Яндекс.Деньгах</option>
			<option value="AC" <?php 
        echo  ( 'AC' == $paymenttype ? 'selected' : '' ) ;
        ?>>С банковской карты</option>
			<option value="MC" <?php 
        echo  ( 'MC' == $paymenttype ? 'selected' : '' ) ;
        ?>>С баланса мобильного телефона</option>
		</select>
		</p>
		<?php 
        $content = ( !empty($instance['content']) ? $instance['content'] : 'Перевести' );
        ?>
		<p>
		<label for="<?php 
        echo  esc_attr( $this->get_field_id( 'content' ) ) ;
        ?>"><?php 
        echo  'Текст на кнопке' ;
        ?></label> 
		<input class="widefat" id="<?php 
        echo  esc_attr( $this->get_field_id( 'content' ) ) ;
        ?>" name="<?php 
        echo  esc_attr( $this->get_field_name( 'content' ) ) ;
        ?>" type="text" value="<?php 
        echo  esc_attr( $content ) ;
        ?>" placeholder="Перевести">
		</p>
		<?php 
        echo  '<p><a href="' . ymb_fs()->get_upgrade_url() . '"><strong>Активируйте ПРО версию</strong></a> чтобы получить доступ к дополнительным настройкам (цвет кнопки, запрос на сбор дополнительной информации с плательщика (ФИО, телефон, почта, адрес), адрес для перенаправления после совершения платежа).</p>' ;
    }
    
    /**
     * Processing widget options on save
     * @param array $new_instance The new options
     * @param array $old_instance The previous options
     * @return array
     */
    public function update( $new_instance, $old_instance )
    {
        $instance = array();
        $instance['receiver'] = ( !empty($new_instance['receiver']) ? sanitize_text_field( $new_instance['receiver'] ) : '' );
        $instance['targets'] = ( !empty($new_instance['targets']) ? sanitize_text_field( $new_instance['targets'] ) : '' );
        $instance['sum'] = ( !empty($new_instance['sum']) ? sanitize_text_field( $new_instance['sum'] ) : '' );
        $instance['paymenttype'] = ( !empty($new_instance['paymenttype']) ? sanitize_text_field( $new_instance['paymenttype'] ) : '' );
        $instance['content'] = ( !empty($new_instance['content']) ? sanitize_text_field( $new_instance['content'] ) : '' );
        return $instance;
    }

}
/**
 * Init YMB Widget
 * @since 2.2.0
 */
add_action( 'widgets_init', function () {
    register_widget( 'Ymb_button' );
} );