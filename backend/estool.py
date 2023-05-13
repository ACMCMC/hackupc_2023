#!/usr/bin/env python
import os
from elasticsearch import Elasticsearch
from dotenv import load_dotenv

load_dotenv()

es_url_pare = os.getenv("ELASTICSEARCH_URL").split('/')[-1]
es_user = os.getenv("ELASTICSEARCH_USERNAME")
es_pswd = os.getenv("ELASTICSEARCH_PASSWORD")
es_cloud_id =  os.getenv("ELASTICSEARCH_CLOUDID")

"""
print(es_url_pare)
print(es_user)
print(es_pswd)
print(es_cloud_id)
"""

print(f"[{es_url_pare}]\n[{es_cloud_id}]")



#es = Elasticsearch([f"https://{os.getenv('')"])
es_client = Elasticsearch(
    cloud_id = es_cloud_id,
    basic_auth=("elastic",es_pswd),
    )

es_client.info()

#res = es.search(index="test-index", query={"match_all":{}})
res = 0
print(res)

"""
es.search(
    index="test",
    body={"query":{"match":{"content":"kitchen"}}})
"""
