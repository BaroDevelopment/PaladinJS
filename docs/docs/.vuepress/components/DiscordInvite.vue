<template>
    <div>
        <div class="discordInvite">
            <div class="di-title">You’ve been invited to join</div>
            <div class="di-icon"></div>
            <div class="di-content">
                <div class="di-content__title">Paladin Bot</div>
                <div class="di-content__meta">be awesome!</div>
            </div>
            <a href="https://discord.gg/RFSYyCU" title="Join Paladin Bot Discord Server">
                <div class="di-button">Join</div>
            </a>
        </div>
    </div>
</template>

<style>
    .di-title {
        color: #B9BBBE;
        text-transform: uppercase;
        font-size: 1.1em;
    }

    .di-content__title {
        font-weight: bold;
        font-size: 1.4em;
        color: #F2F2F2;
        padding-bottom: 0.5em;
    }

    .di-content__meta {
        color: #72767D;
        font-size: 1.1em;
        color: cyan;
    }

    .discordInvite {
        width: 320px;
        max-width: 500px;
        min-width: 320px;
        height: auto;
        background: #2F3136;
        border: 1.5px solid #2A2C31;
        border-radius: 3px;
        padding: 10px 15px;
        font-size: 0.8em;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .di-icon {
        display: inline-block;
        height: 70px;
        width: 70px;
        margin: 10px 10px 5px 0px;
        border-radius: 40px;
        background-image: url(https://cdn.discordapp.com/attachments/396964573007052800/492135654919241739/PaladinMainAvatar.png);
        background-size: cover;
        background-color: #7289DA;
        color: #F5F5F5;
        text-align: center;
        line-height: 60px;
    }

    .di-content {
        display: inline-block;
        transform: translateY(-35%);
    }

    .di-button {
        float: right;
        width: 80px;
        height: 40px;
        border-radius: 3px;
        background-color: #43B581;
        color: #F5F5F5;
        transform: translateY(75%);
        text-align: center;
        line-height: 40px;
    }

    .di-button:hover {
        filter: contrast(150%);
    }
</style>
