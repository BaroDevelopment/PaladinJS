<template lang="html">
    <div v-if="api" class="con-api">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Parameters</th>
                    <th>Description</th>
                    <th>default</th>
                </tr>
            </thead>
            <tbody v-for="tr in api">
                <tr>
                    <td width="120px">{{tr.name}}</td>
                    <td>{{tr.type}}</td>
                    <td>{{tr.parameters}}</td>
                    <td>{{tr.description}}</td>
                    <td>{{tr.default}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
	export default {
		name: 'API',
		computed: {
			api() {
				console.log(this.$page.frontmatter);
				return this.$page.frontmatter.API;
			},
			data() {
				return this.$page.frontmatter;
			},
		},
		mounted() {
			// this.$parent.codes.push({
			//   idx:'vs-api',
			//   title:'API'
			// })
		},
	};
</script>

<style lang="stylus" scoped>
    .con-api
        margin-left:auto;
        max-width: 1400px;

    table
        overflow:auto
        border-collapse collapse
        margin 1rem 0
        display: block
    table td
        padding: 5px;
        text-align: center;
    th
        text-align: center;
        color: white
        font-weight bold, italic
    tbody
        //&:nth-child(2n+1)
        //    background-color lighten($bg-color, 10%)
    td
        white-space: nowrap
        width:auto;
    @media only screen and (max-width: 650px)
        .con-api
            width: calc(100% - 30px);
        table td
            font-size: 13px !important;
</style>