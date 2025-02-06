import { type Ref, defineComponent, inject, onMounted, ref, watch, watchEffect } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

import PostService from './post.service';
import { type IPost } from '@/shared/model/post.model';
import useDataUtils from '@/shared/data/data-utils.service';
import { useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Post',
  setup() {
    const dateFormat = useDateFormat();
    const dataUtils = useDataUtils();
    const postService = inject('postService', () => new PostService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const currentSearch = ref('');
    const itemsPerPage = ref(20);
    const queryCount: Ref<number> = ref(null);
    const page: Ref<number> = ref(1);
    const propOrder = ref('id');
    const reverse = ref(false);
    const totalItems = ref(0);
    const links: Ref<any> = ref({});

    const posts: Ref<IPost[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {
      currentSearch.value = '';
      page.value = 1;
      links.value = {};
      posts.value = [];
    };

    const sort = (): Array<any> => {
      const result = [`${propOrder.value},${reverse.value ? 'desc' : 'asc'}`];
      if (propOrder.value !== 'id') {
        result.push('id');
      }
      return result;
    };

    const retrievePosts = async () => {
      isFetching.value = true;
      try {
        const paginationQuery = {
          page: page.value - 1,
          size: itemsPerPage.value,
          sort: sort(),
        };
        const res = currentSearch.value
          ? await postService().search(currentSearch.value, paginationQuery)
          : await postService().retrieve(paginationQuery);
        totalItems.value = Number(res.headers['x-total-count']);
        queryCount.value = totalItems.value;
        links.value = dataUtils.parseLinks(res.headers?.link);
        posts.value.push(...(res.data ?? []));
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      clear();
    };

    onMounted(async () => {
      await retrievePosts();
    });

    const search = query => {
      if (!query) {
        return clear();
      }
      currentSearch.value = query;
      retrievePosts();
    };

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IPost) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removePost = async () => {
      try {
        await postService().delete(removeId.value);
        const message = `A Post is deleted with identifier ${removeId.value}`;
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        clear();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    const changeOrder = (newOrder: string) => {
      if (propOrder.value === newOrder) {
        reverse.value = !reverse.value;
      } else {
        reverse.value = false;
      }
      propOrder.value = newOrder;
    };

    // Whenever order changes, reset the pagination
    watch([propOrder, reverse], () => {
      clear();
    });

    // Whenever the data resets or page changes, switch to the new page.
    watch([posts, page], async ([data, page], [_prevData, prevPage]) => {
      if (data.length === 0 || page !== prevPage) {
        await retrievePosts();
      }
    });

    const infiniteScrollEl = ref<HTMLElement>(null);
    const intersectionObserver = useIntersectionObserver(
      infiniteScrollEl,
      intersection => {
        if (intersection[0].isIntersecting && !isFetching.value) {
          page.value++;
        }
      },
      {
        threshold: 0.5,
        immediate: false,
      },
    );
    watchEffect(() => {
      if (links.value.next) {
        intersectionObserver.resume();
      } else if (intersectionObserver.isActive) {
        intersectionObserver.pause();
      }
    });

    return {
      posts,
      handleSyncList,
      isFetching,
      retrievePosts,
      clear,
      ...dateFormat,
      currentSearch,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removePost,
      itemsPerPage,
      queryCount,
      page,
      propOrder,
      reverse,
      totalItems,
      changeOrder,
      infiniteScrollEl,
      ...dataUtils,
    };
  },
});
