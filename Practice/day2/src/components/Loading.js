import Modal from './Modal.js';

var template = `
    <modal v-if="isShow">
        <div class="loading">Loading</div>
    </modal>
`;

export default {
    template,
    props: {
        isShow: {
            default: false,
            type: Boolean
        }
    },
    components: {
        Modal
    }
}