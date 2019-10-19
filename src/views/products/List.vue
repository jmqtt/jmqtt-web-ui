<template>
  <div class="products-view emq-crud">
    <div class="crud-header">
      <el-row
        type="flex"
        justify="space-between"
        align="middle">
        <el-col :span="18">
          <template v-if="tenantType === 0" slot.custom-tab="crudTabsHead">
            <tabs-card-head :tabs="productsTabsHead"/>
          </template>
          <span v-else class="crud-title">产品</span>
        </el-col>
        <el-col :span="6">
          <emq-button
            class="create-btn"
            @click="newProduct">
            + 新建
          </emq-button>
        </el-col>
      </el-row>
    </div>
    <empty-page v-if="isEmpty" :empty-info="productsEmptyInfo"/>
    <div class="emq-card-list-view product-card-list">
      <el-row v-loading="loading" :gutter="20">
        <el-col v-for="(record, index) in records" :key="index" :span="8">
          <el-card class="box-card" @click.native="showDetails(record, 'view')">
            <div slot="header" class="clearfix">
              <span>{{ record.productName }}</span>
              <el-dropdown
                v-if="(has(`PUT,${url}/:id`) || has(`DELETE,${url}`))"
                :show-timeout="0"
                class="card-dropdown"
                trigger="click">
                <el-button type="text" @click.stop >
                  <i class="material-icons" style="color: #a7a7a7;">more_vert</i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <a
                    v-if="has(`PUT,${url}/:id`)"
                    href="javascript:;"
                    @click="showDetails(record, 'edit')">
                    <el-dropdown-item>
                      <i class="iconfont icon-emq-edit"/>
                      {{ $t('oper.edit') }}
                    </el-dropdown-item>
                  </a>
                  <a v-if="has(`DELETE,${url}`)" href="javascript:;" @click="showConfirmDialog(record.id)">
                    <el-dropdown-item>
                      <i class="iconfont icon-emq-delete"/>
                      {{ $t('oper.delete') }}
                    </el-dropdown-item>
                  </a>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <el-form>
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="`${$t('products.deviceNum')}：`">
                    <template>
                      <a @click.stop="showDetails(record, 'tab', 'devices')">
                        {{ record.deviceCount }}
                      </a>
                      <span>{{ $t('products.tai') }}</span>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="`${$t('products.dataPoints')}：`">
                    <template>
                      <span v-if="record.dataPointCount === '-'">{{ record.dataPointCount }}</span>
                      <div v-else>
                        <a @click.stop="showDetails(record, 'tab', 'definition')">
                          {{ record.dataPointCount }}
                        </a>
                        <span>{{ $t('products.ge') }}</span>
                      </div>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col :span="12"/>
                <el-col :span="12">
                  <el-form-item :label="`${$t('products.dataStreams')}：`">
                    <template>
                      <span v-if="record.dataStreamCount === '-'">{{ record.dataStreamCount }}</span>
                      <div v-else>
                        <a
                          @click.stop="showDetails(record, 'tab', 'definition')">
                          {{ record.dataStreamCount }}
                        </a>
                        <span>{{ $t('products.ge') }}</span>
                      </div>
                    </template>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="cloud-protocol-tag">
              <span class="left-triangle"/>
              <span class="white-point"/>
              {{ record.cloudProtocolLabel }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <el-pagination
        v-if="total>9"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        background
        layout="prev, pager, next"
        @current-change="currentPageChanged"/>
    </div>
  </div>
</template>

<script>
  import ProductsApi from '@/api/products/ProductsApi'
  import EmptyPage from '@/components/EmptyPage'
  import TabsCardHead from '@/components/TabsCardHead'
  export default {
    name: 'ProductsList',
    components: {
      EmptyPage,
      TabsCardHead
    },
    data() {
      return {
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          mac: '',
          type: 'ALL',
          page: 1,
          pageSize: 10
        },
        loading: false,
        confirmDialogVisible: false,
        url: this.$route.path,
        records: [],
        willDeleteId: undefined,
        isEmpty: false,
        tenantType: '',
        productsTabsHead: [
          {
            code: 'products',
            order: 1,
            url: '/products'
          },
          {
            code: 'profilesReview',
            order: 2,
            url: '/codec'
          }
        ],
        productsEmptyInfo: {
          title: '您还没有任何产品',
          subTitle: '点击右上角进行创建'
        }
      }
    },
    computed: {
      currentProducts() {
        return this.$store.state.products.currentProducts
      }
    },
    created() {
      this.loadRecords()
    },
    methods: {
      loadRecords() {
        this.loading = true
        ProductsApi.list().then((response) => {
          this.total = response.data.meta.count
          this.records = response.data.items
          if (!this.records.length) {
            this.isEmpty = true
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      newProduct() {
        this.$router.push({ path: `${this.url}/0`, query: { oper: 'create' } })
      },
      showDetails(record, accessType, tab = undefined) {
        this.localCache(record)
        if (accessType === 'tab' && tab) {
          this.$router.push({ path: `/products/${record.id}/${tab}` })
        } else {
          this.$router.push({ path: `${this.url}/${record.id}`, query: { oper: accessType } })
        }
      },
      showConfirmDialog(deleteID = undefined) {
        if (deleteID) {
          this.willDeleteId = deleteID
        }
        this.confirmDialogVisible = true
      },
      deleteRocord() {
        ProductsApi.delete(this.willDeleteId).then(() => {
          this.$message.success('删除成功')
          this.confirmDialogVisible = false
          this.loadRecords()
        })
        this.confirmDialogVisible = false
      },
      currentPageChanged(page) {
        this.currentPage = page
        this.loadRecords()
      },
      localCache(cache) {
        const currentProducts = this.currentProducts.slice()
        const currentProduct = {
          productName: cache.productName,
          productIntID: cache.id,
          cloudProtocol: cache.cloudProtocol,
          gatewayProtocol: cache.gatewayProtocol,
          productID: cache.productID,
          productType: cache.productType
        }
        const hasExist = currentProducts.find(item => item.productIntID === cache.id)
        if (!hasExist) { // Join the cache when there is no such product in the cache
          currentProducts.push(currentProduct)
        }
        this.STORE_PRODUCTS({ currentProducts })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/emqCardList.scss';

  .products-view {
    .el-form {
      height: 78px;
    }
    .product-card-list {
      .box-card {
        height: auto;
        .el-card__header {
          line-height: 16px;
          padding: 20px 30px;
        }
        .el-card__body {
          padding: 10px 30px 30px;
        }
        .el-form-item {
          margin-bottom: -5px;
          height: 41px;
          .el-form-item__label {
            color: var(--color-text-light);
            font-weight: 500;
          }
          .el-form-item__content a {
            font-size: 18px;
            font-weight: 500;
          }
        }
        .cloud-protocol-tag {
          margin-top: 20px;
          position: relative;
          background-color: var(--color-bg-tag);
          display: inline-block;
          margin-left: 12px;
          line-height: 24px;
          padding: 0 12px;
          color: var(--color-text-lighter);
          .left-triangle {
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border-width: 12px 12px 12px 0;
            left: -12px;
            border-style: solid;
            border-color: transparent var(--color-bg-tag) transparent transparent;
          }
          .white-point {
            position: absolute;
            display: block;
            width: 6px;
            height: 6px;
            top: 50%;
            left: -1px;
            margin-top: -3px;
            border-radius: 50%;
            background-color: #fff;
          }
        }
      }
      .el-col-8 {
        min-width: 267px;
      }
    }
  }
</style>
