/**
 * Yandex money donate button block for Gutenberg editor
 * based on Yandex Money API
 *
 * @link https://tech.yandex.ru/money/doc/payment-buttons/about-docpage/
 * @since 1.0.0
 */

( function( blocks, editor, element, components, cupc, options ) {

    var el = element.createElement,
    registerBlockType = blocks.registerBlockType,
    InspectorControls = editor.InspectorControls,
	TextControl = components.TextControl,
    RadioControl = components.RadioControl,
    Panel = components.Panel,
    PanelBody = components.PanelBody,
    PanelRow = components.PanelRow,
    Fragment = element.Fragment,
    RichText = editor.RichText,
    cupc = cupc,
    options = options;

	/**
     * SVG block icon (Yandex money orange wallet)
     * @since 1.0.0
     * @return object <svg> html element
     */
    var blockIcon = el(
    	'svg',
    	{
    		width: '24',
    		height: '24',
    		viewBox: '0 0 24 24',
    	},
    	el(
    		'g',
    		{
    			fill: 'none',
    		},
    		el(
    			'path',
    			{
    				d: 'M19.419 9.152H4.583C3.712 9.152 3 9.864 3 10.735v9.574c0 .87.712 1.582 1.583 1.582h14.836V9.152z',
    				fill: '#FAC514',
    			}
    		),
    		el(
    			'path',
    			{
    				d: 'M3 20.309v-9.574c0-.87.712-1.583 1.583-1.583h12.23v7.642L4.75 20.719 3 20.309z',
    				fill: '#D7AB05',
    			}
    		),
    		el(
    			'path',
    			{
    				d: 'M14.353 0v13.98L4.359 20.79 3 20.012V10.71c0-1.212.102-1.982 2.612-3.856C7.691 5.303 14.352 0 14.352 0',
    				fill: '#FAC514',
    			}
    		),
    		el(
    			'path',
    			{
    				d: 'M10.506 8.694c.545-.65 1.34-.878 1.777-.511.436.366.349 1.189-.195 1.838-.545.648-1.34.878-1.776.51-.437-.365-.35-1.189.194-1.837',
    				fill: '#020202',
    			}
    		)
    	)
    );

    /**
     * SVG button icon (Same as blockIcon)
     * @see  blockIcon
     * @since 2.0.0
     * @return object <svg> html element
     */
    var pcIcon = blockIcon;

    /**
     * SVG button icon (Credit Cards)
     * @since 2.0.0
     * @return object <svg> html element
     */
    var acIcon = el(
        'svg',
        {
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
        },
        el(
            'g',
            {
                fill: '#3C3C3C',
                'fill-rule': 'evenodd',
            },
            el(
                'path',
                {
                    d: 'M15.948 7l-1.94-3.358a1.997 1.997 0 0 0-2.72-.73l-9.54 5.509a1.993 1.993 0 0 0-.73 2.72l3.508 6.077c.154.266.36.483.6.646A2.998 2.998 0 0 1 5 17.001V10A2.994 2.994 0 0 1 8 7h7.948z',
                }
            ),
            el(
                'path',
                {
                    d: 'M6 9.992C6 8.892 6.893 8 7.992 8h11.016C20.108 8 21 8.9 21 9.992v7.016c0 1.1-.893 1.992-1.992 1.992H7.992C6.892 19 6 18.1 6 17.008V9.992zm1 .006C7 9.447 7.447 9 7.999 9H19c.552 0 .999.446.999.998v7.004c0 .551-.447.998-.999.998H8A.998.998 0 0 1 7 17.002V9.998zM7 11h13v2H7v-2z',
                }
            )
        )
    );

    /**
     * SVG button icon (Mobile phone)
     * @since 2.0.0
     * @return object <svg> html element
     */
    var mcIcon = el(
        'svg',
        {
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
        },
        el(
           'path',
            {
                d: 'M5 1.991C5 .891 5.902 0 7.009 0h7.982C16.101 0 17 .89 17 1.991V20.01c0 1.1-.902 1.991-2.009 1.991H7.01C5.899 22 5 21.11 5 20.009V1.99zM6 2h10v15H6V2zm4 17h2v1h-2v-1z',
                fill: '#3C3C3C',
                'fill-rule': 'evenodd',
            }
        )
    );

    /**
     * Plugin block html class
     *
     * @since  2.0.0
     * @type string
     */
    var blockClass = 'wp-block-ymb-button';

    /**
     * Register yandex button block
     * @since 2.1.0 Added default values for reciever, targets and sum
     * @since 1.0.0
     */
    registerBlockType( 'ymb/button', {
        title: 'Кнопка Яндекс Денег',
        icon: blockIcon,
        category: 'embed',
        attributes: {
        	receiver: {
        		type: 'string',
        		source: 'attribute',
        		selector: '[name="receiver"]',
                attribute: 'value',
                default: options.receiver,
        	},
        	targets: {
        		type: 'string',
        		source: 'attribute',
        		attribute: 'value',
                selector: '[name="targets"]',
                default: options.targets,
        	},
        	paymenttype: {
        		type: 'string',
        		source: 'attribute',
        		attribute: 'value',
        		selector: '[name="paymentType"]',
        	},
        	sum: {
        		type: 'string',
        		source: 'attribute',
        		attribute: 'value',
                selector: '[name="sum"]',
                default: options.sum,
        	},
            /**
             * Button text attribute
             * @since 2.0.0
             * @type {Object}
             */
            content: {
                type: 'array',
                source: 'children',
                selector: 'span',
                default: 'Перевести',
            },

            /**
             * Button background color
             * @since 2.0.0
             */
            buttonColor: {
                type: 'string',
                default: '#ffdb4d',
            },

            /**
             * Button text color
             * @since 2.0.0
             */
            textColor: {
                type: 'string',
                default: '#000',
            },

            /**
             * Success url
             * @since 2.0.0
             */
            successURL: {
                type: 'string',
                source: 'attribute',
                attribute: 'value',
                selector: '[name="successURL"]',
            },

            /**
             * Additional user data yandex fields
             * @since 2.0.0
             */
            needFio: {
                type: 'string',
                source: 'attribute',
                attribute: 'value',
                selector: '[name="need-fio"]',
                default: 'false',
            },
            needEmail: {
                type: 'string',
                source: 'attribute',
                attribute: 'value',
                selector: '[name="need-email"]',
                default: 'false',
            },
            needPhone: {
                type: 'string',
                source: 'attribute',
                attribute: 'value',
                selector: '[name="need-phone"]',
                default: 'false',
            },
            needAddress: {
                type: 'string',
                source: 'attribute',
                attribute: 'value',
                selector: '[name="need-address"]',
                default: 'false',
            },

        },
        edit: function( props ) {

            /**
             * Selects button icon depending on selected payment type
             * @since  2.0.0
             * @return object <svg> html element
             */
            function getButtonIcon(){

                if( props.attributes.paymenttype == 'AC' ) {
                    return acIcon;
                }
                if( props.attributes.paymenttype == 'PC' ) {
                    return pcIcon;
                }
                if( props.attributes.paymenttype == 'MC' ) {
                    return mcIcon;
                }
                return pcIcon;
            }

        	/**
    		 * Change block attribute
             * @since  1.0.1 Some misprint fix
    		 * @since  1.0.0
    		 * @param  string attributeName	Block attribute name
    		 * @param  string newValue		Block attribute new value
    		 */
    		function onChangeSetting( attributeName, newValue ) {
    			props.setAttributes( { [attributeName]: newValue } );
    		};

    		var myAttributes = props.attributes;

    		return el(
            	Fragment,
            	null,
            	el (
    	        	InspectorControls,
    	        	null ,
    	        	el(
    	        		'p',
    	        		null,
    	        		'Обязательные настройки, без них вы не сможете принимать переводы.'
    	        	),
    	        	el(
    	        		TextControl,
    	        		{
    	        			label: 'Номер счета Яндекс Денег на который вы хотите принимать переводы',
    	        			value: myAttributes.receiver,
    	        			onChange: function(e) {
    	        				onChangeSetting('receiver', e)
    	        			},
                            placeholder: '41001xxxxxxxxxxxx',
    	        		},
    	        	),
    	        	el(
    	        		TextControl,
    	        		{
    	        			label: 'Назначение платежа',
    	        			value: myAttributes.targets,
    	        			onChange: function(e) {
    	        				return onChangeSetting('targets', e)
    	        			},
                            placeholder: 'На реактор холодного ядерного синтеза',
    	        		},
    	        	),
    	        	el(
    	        		TextControl,
    	        		{
    	        			label: 'Сумма платежа в рублях',
    	        			value: myAttributes.sum,
    	        			onChange: function(e) {
    	        				return onChangeSetting('sum', e)
    	        			},
    	        			help: 'Спишется с отправителя',
                            placeholder: '100',
    	        		},
    	        	),
    	        	el(
    	        		RadioControl,
    	        		{
    	        			label: 'Способ оплаты',
    	        			selected: myAttributes.paymenttype,
    	        			options: [
    	        				{ label: 'Оплата из кошелька в Яндекс.Деньгах', value: 'PC' },
    	        				{ label: 'С банковской карты', value: 'AC' },
    	        				{ label: 'С баланса мобильного телефона', value: 'MC' },
    	        			],
    	        			onChange: function(e) {
    	        				return onChangeSetting('paymenttype', e)
    	        			},
    	        		}
    	        	)


    	        ),
            	el(
            		'form',
            			{
                            method: 'POST',
            				className: props.className,
                            action: 'https://money.yandex.ru/quickpay/confirm.xml',
                            target: '_blank',
            			},
            		el(
            			'input',
            			{
            				type: 'hidden',
            				name: 'receiver',
            				value: myAttributes.receiver,
            			}
            		),
            		el(
            			'input',
            			{
            				type: 'hidden',
            				name: 'quickpay-form',
            				value: 'small',
            			}
            		),
            		el(
            			'input',
            			{
            				type: 'hidden',
            				name: 'targets',
            				value: myAttributes.targets,
            			}
            		),
            		el(
            			'input',
            			{
            				type: 'hidden',
            				name: 'paymentType',
            				value: myAttributes.paymenttype,
            			}
            		),
            		el(
            			'input',
            			{
            				type: 'hidden',
            				name: 'sum',
            				value: myAttributes.sum,
            			}
            		),
                    el(
                        'input',
                        {
                            type: 'hidden',
                            name: 'successURL',
                            value: myAttributes.successURL,
                        }
                    ),
                    el(
                        'input',
                        {
                            type: 'hidden',
                            name: 'need-fio',
                            value: myAttributes.needFio,
                        }
                    ),
                    el(
                        'input',
                        {
                            type: 'hidden',
                            name: 'need-email',
                            value: myAttributes.needEmail,
                        }
                    ),
                    el(
                        'input',
                        {
                            type: 'hidden',
                            name: 'need-phone',
                            value: myAttributes.needPhone,
                        }
                    ),
                    el(
                        'input',
                        {
                            type: 'hidden',
                            name: 'need-address',
                            value: myAttributes.needAddress,
                        }
                    ),

            		el(
            			'button',
            			{
                            type: 'button',
                            style: {
                                'background': myAttributes.buttonColor,
                                'background-color': myAttributes.buttonColor,
                                color: myAttributes.textColor,
                            },
                        },
            			el(
            				'div',
            				{
                                className: props.className + '-div',
                            },
                            getButtonIcon()
            			),
            			el(
                            RichText,
                            {
                                tagName: 'span',
                                className: props.className + '-span',
                                onChange: function(e) {
                                    return onChangeSetting('content', e)
                                },
                                value: props.attributes.content,
                                placeholder: 'Пeревести',
                                style: {
                                    color: myAttributes.textColor,
                                },
                            }
                        )
            		)
            	)
            );
        },

        save: function( props ) {

            /**
             * @see getButtonIcon() in 'edit' function
             * @since  2.0.0
             */

            function getButtonIcon() {
                if( props.attributes.paymenttype == 'AC' ) {
                    return acIcon;
                }
                if( props.attributes.paymenttype == 'PC' ) {
                    return pcIcon;
                }
                if( props.attributes.paymenttype == 'MC' ) {
                    return mcIcon;
                }
                return pcIcon;
            }

            myAttributes = props.attributes;

            return el(
        		'form',
        		{
        			method: 'POST',
        			action: 'https://money.yandex.ru/quickpay/confirm.xml',
        			target: '_blank',

        		},
        		el(
        			'input',
        			{
        				type: 'hidden',
        				name: 'receiver',
        				value: props.attributes.receiver,
        			}
        		),
        		el(
        			'input',
        			{
        				type: 'hidden',
        				name: 'quickpay-form',
        				value: 'small',
        			}
        		),
        		el(
        			'input',
        			{
        				type: 'hidden',
        				name: 'targets',
        				value: props.attributes.targets,
        			}
        		),
        		el(
        			'input',
        			{
        				type: 'hidden',
        				name: 'paymentType',
        				value: props.attributes.paymenttype,
        			}
        		),
        		el(
        			'input',
        			{
        				type: 'hidden',
        				name: 'sum',
        				value: props.attributes.sum,
        			}
        		),
                el(
                    'input',
                    {
                        type: 'hidden',
                        name: 'successURL',
                        value: props.attributes.successURL,
                    }
                ),
                el(
                    'input',
                    {
                        type: 'hidden',
                        name: 'need-fio',
                        value: props.attributes.needFio,
                    }
                ),
                el(
                    'input',
                    {
                        type: 'hidden',
                        name: 'need-email',
                        value: props.attributes.needEmail,
                    }
                ),
                el(
                    'input',
                    {
                        type: 'hidden',
                        name: 'need-phone',
                        value: props.attributes.needPhone,
                    }
                ),
                el(
                    'input',
                    {
                        type: 'hidden',
                        name: 'need-address',
                        value: props.attributes.needAddress,
                    }
                ),
        		el(
        			'button',
        			{
        				type: 'submit',
                        style: {
                            background: myAttributes.buttonColor,
                            'background-color': myAttributes.buttonColor,
                            color: myAttributes.textColor,
                        }
        			},
        			el(
        				'div',
        				{
                            className: blockClass + '-div',
                        },
        				getButtonIcon()
        			),
        			el(
                        'span',
                        {
                            className: blockClass + '-span',
                            style: {
                                color: myAttributes.textColor,
                            }
                        },
                        props.attributes.content
        			)
        		)
        	)
        },
    } );

} )(
    window.wp.blocks,
    window.wp.editor,
    window.wp.element,
    window.wp.components,
    cupc,
    options
);
