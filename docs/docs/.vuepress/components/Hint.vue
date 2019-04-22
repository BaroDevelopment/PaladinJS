<template>
    <div :class="type" class="custom-block" wfd-id="239">
        <img v-if="img" :src="img" class="HintAvatar"/>
        <p v-if="title" class="custom-block-title">{{title}}</p>
        <p>{{text}}</p>
    </div>
</template>

<script>
	export default {
		name: 'Hint',
		data() {
			return {
				tipGreen: '#42b983',
				warningYellow: '#ffe564',
				dangerRed: '#ff3331',
				infoBlue: '#00b3ff',
			};
		},
		props: {
			type: {
				type: String,
				default: 'info',
			},
			text: {
				type: String,
				required: true,
			},
			title: {
				type: String,
			},
			img: {
				type: String,
			},
		},
	};
</script>

<style scoped lang="stylus">
    $tipGreen = #42b983;
    $warningYellow = #ffe564;
    $dangerRed = #ff3331;
    $infoBlue = #00b3ff;

    img, .HintAvatar
        user-select: none
        max-width: 70px !important
        border-radius: 100%
        float: left
        margin-right: 30px
        margin-top: 15px

    .material-icons
        position: absolute;
        z-index: 1;

    .custom-block
        .custom-block-title
            font-weight 600
            margin-bottom -0.4rem
        &.tip, &.warning, &.danger, &.info
            padding .1rem 1.5rem
            border-left-width .35rem
            border-left-style solid
            margin 1rem 0
        &.tip
            color: lighten($tipGreen, 50%);
            background-color: alpha($tipGreen, 0.25)
            border-color $tipGreen

            .custom-block-title
                color: lighten($tipGreen, 20%);
            a
                color darken($tipGreen, 20%);
        &.info
            color: lighten($infoBlue, 50%);
            background-color: alpha($infoBlue, 0.25)
            border-color $infoBlue

            .custom-block-title
                color: lighten($infoBlue, 20%);
            a
                color darken($infoBlue, 20%);
        &.warning
            background-color: alpha($warningYellow, 0.25)
            border-color darken($warningYellow, 35%)
            color: lighten($warningYellow, 40%);
            .custom-block-title
                color darken($warningYellow, 30%)
            a
                color darken($warningYellow, 20%);
        &.danger
            background-color: alpha($dangerRed, 0.25)
            border-color darken($dangerRed, 20%)
            color: lighten($dangerRed, 50%);

            .custom-block-title
                color: lighten($dangerRed, 5%);
            a
                color: darken($dangerRed, 5%);

    @media (max-width: $MQMobile)
        .custom-block
            img
                display: block
                margin: 15px auto 15px 0 !important
                float: none !important
</style>